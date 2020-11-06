import React, { Component } from 'react';
import { Container, Card, Row, Col, Button, Spinner } from 'react-bootstrap'
import axios, { AxiosError } from 'axios'
import urljoin from 'url-join'
import api from '../../datas/api'
import { Permissions } from 'discord.js'
import { PartialGuildExtend } from '../../types/DiscordTypes'

interface ServersState {
  guilds: PartialGuildExtend[]
  fetchDone: boolean
}

export default class Servers extends Component<{}, ServersState> {
  state: ServersState = {
    guilds: [],
    fetchDone: false
  }

  getGuilds = async (token: string) => {
    try {
      let res = await axios.get(urljoin(api, '/discord/users/@me/guilds'), {
        headers: {
          token: token
        }
      })
      this.setState({ guilds: res.data })
    }
    catch (e) {
      this.setState({ guilds: [] })
    }
    finally {
      this.setState({ fetchDone: true })
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.getGuilds(token)
    }
    else {
      window.location.assign('/login')
    }
  }

  render() {
    const guild_cards = this.state.guilds
      .filter(one => {
        let perms = new Permissions(Number(one.permissions))
        return perms.has(Permissions.FLAGS.ADMINISTRATOR)
      })
      .sort((a, b) => Number(!a.bot_joined) - Number(!b.bot_joined))
      .map((one, index) => (
        <Card key={index} bg="dark" text="light" className="Dashboard-Servers-Card" style={{
          animationDelay: `${index * 80}ms`,
        }}>
          <Card.Body style={{ padding: 'unset', fontSize: '12pt' }}>
            <Container>
              <Row>
                <Col>
                  <div style={{ height: 40, display: 'table-cell', verticalAlign: 'middle' }}>
                    <img alt="" src={`https://cdn.discordapp.com/icons/${one.id}/${one.icon}.png`} style={{ maxHeight: 40, marginRight: 15, borderRadius: '70%' }} />
                    {one.name}
                  </div>
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  {
                    one.bot_joined
                      ? <Button variant="success" size="sm" href={`/dashboard/${one.id}`}>대시보드</Button>
                      : <Button variant="secondary" size="sm">초대하기</Button>
                  }

                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      ))

    return (
      <>
        <Container fluid="sm" className="text-center">
          <h2 style={{ color: "whitesmoke", marginTop: 120, marginBottom: 120, fontSize: '30pt' }}>서버를 선택하세요</h2>
        </Container>
        <Container fluid="sm" style={{ marginBottom: 160 }}>
          {
            this.state.fetchDone
              ? guild_cards
              : <div style={{ color: 'whitesmoke', paddingTop: 80, paddingBottom: 300 }} className="text-center">
                <Spinner animation="border" variant="aztra" style={{
                  height: 50,
                  width: 50
                }} />
                <h3 className="pt-5">
                  서버 목록을 가져오고 있습니다...
                  </h3>
              </div>
          }
        </Container>
      </>
    )
  }
}