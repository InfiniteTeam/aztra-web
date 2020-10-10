import React, { Component } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import urljoin from 'url-join'
import oauth2 from '../../datas/oauth'
import { Permissions } from 'discord.js'

export default class Servers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guilds: [],
      fetchDone: false
    }
  }

  getGuilds = async token => {
    try {
      let res = await axios.get(urljoin(oauth2.api_endpoint, '/users/@me/guilds'), {
        headers: {
          Authorization: `Bearer ${token}`
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
      .map((one, index) => (
        <Card key={index} bg="dark" text="light" className="Dashboard-Servers-Card" style={{
          animationDelay: `${index * 80}ms`,
        }}>
          <Card.Body style={{ padding: 'unset', fontSize: '12pt'}}>
            <Container>
              <Row>
                <Col>
                  <div style={{ height: 40, display: 'table-cell', verticalAlign: 'middle' }}>
                    <img alt="" src={`https://cdn.discordapp.com/icons/${one.id}/${one.icon}.png`} style={{ maxHeight: 40, marginRight: 15, borderRadius: '70%' }} />
                    {one.name}
                  </div>
                </Col>
                <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Button variant="secondary ml-2" size="sm" href={`/dashboard/${one.id}`}>대시보드</Button>
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
              : <h4 style={{ color: 'whitesmoke', paddingTop: 100, paddingBottom: 300 }} className="text-center">서버 목록을 가져오고 있습니다...</h4>
          }
        </Container>
      </>
    )
  }
}