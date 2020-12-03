import React, { Component } from 'react';
import { Container, Card, Row, Col, Button, Spinner } from 'react-bootstrap'
import axios, { AxiosError } from 'axios'
import urljoin from 'url-join'
import api from '../../datas/api'
import { Permissions } from 'discord.js'
import { PartialGuildExtend } from '../../types/DiscordTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const swal = require('@sweetalert/with-react')

interface ServersState {
  guilds: PartialGuildExtend[]
  fetchDone: boolean | null,
  fetchError: AxiosError | null
}

export default class Servers extends Component<{}, ServersState> {
  state: ServersState = {
    guilds: [],
    fetchDone: null,
    fetchError: null
  }

  getGuilds = async (token: string) => {
    this.setState({ fetchDone: null })
    try {
      let res = await axios.get(urljoin(api, '/discord/users/@me/guilds'), {
        headers: {
          token: token
        }
      })
      this.setState({ guilds: res.data, fetchDone: true })
    }
    catch (e) {
      this.setState({ guilds: [], fetchError: e, fetchDone: false })
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
    if (this.state.fetchDone === false) {
      swal(
        <div>
          <h2>서버를 가져올 수 없습니다!</h2>
          <p className="px-3">
            서버 데이터를 불러오는 데 실패했습니다.
          </p>
          <Button variant="danger" onClick={() => {
            swal.close()
            this.componentDidMount()
          }}>
            다시 시도하기
          </Button>
        </div>,
        {
          icon: "error",
          button: false
        }
      )
    }

    const guild_cards = this.state.guilds
      .filter(one => {
        let perms = new Permissions(Number(one.permissions))
        return perms.has(Permissions.FLAGS.ADMINISTRATOR)
      })
      .sort((a, b) => Number(!a.bot_joined) - Number(!b.bot_joined))
      .map((one, index) => (
        <Card key={index} bg="dark" text="light" className="Dashboard-Servers-Card shadow" style={{
          animationDelay: `${index * 80}ms`,
        }}>
          <Card.Body className="p-0" style={{ fontSize: '12pt' }}>
            <Container>
              <Row>
                <Col>
                  <div style={{ minHeight: 40 }} className="d-flex align-items-center">
                    <img alt="" src={`https://cdn.discordapp.com/icons/${one.id}/${one.icon}.png`} style={{ maxHeight: 40, marginRight: 15, borderRadius: '70%' }} />
                    <div>
                      {one.name
                    }</div>

                  </div>
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                  {
                    one.bot_joined
                      ? <>
                        <FontAwesomeIcon icon={faStar} className="mr-3" />
                        <Button variant="success" size="sm" href={`/dashboard/${one.id}`}>대시보드</Button>
                      </>
                      : <Button variant="secondary" size="sm">초대하기</Button>
                  }
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      ))

    return (
      <div className="min-vh-100">
        <Container fluid="sm" className="text-center">
          {
            this.state.fetchDone === true && guild_cards.length === 0
              ? <>
                <h2 className="text-white" style={{ marginTop: 120, marginBottom: 120 }}>
                  관리할 수 있는 서버가 하나도 없습니다!
                  <h4 className="text-white mt-5" >관리자 권한이 있는 서버만 표시됩니다.</h4>
                </h2>
                <Button variant="aztra" onClick={() => this.componentDidMount()}>
                  <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                  새로고침
                </Button>
              </>
              : <h2 className="text-white" style={{ marginTop: 120, marginBottom: 120 }}>서버를 선택하세요</h2>
          }
        </Container>
        <Container fluid="sm" style={{ marginBottom: 160 }}>
          {
            this.state.fetchDone === null
              ? <div style={{ color: 'whitesmoke', paddingTop: 80, paddingBottom: 300 }} className="text-center">
                <Spinner animation="border" variant="aztra" style={{
                  height: 50,
                  width: 50
                }} />
                <h3 className="pt-5">
                  서버 목록을 가져오고 있습니다...
                  </h3>
              </div>
              : guild_cards
          }
        </Container>
      </div>
    )
  }
}