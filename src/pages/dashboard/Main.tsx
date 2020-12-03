import React, { Component } from 'react';
import axios from 'axios'
import { Card, Button, Row, Col, Container, Spinner } from 'react-bootstrap'
import { MemberMinimal, PartialGuild } from '../../types/DiscordTypes'
import urljoin from 'url-join';
import api from '../../datas/api';

interface MainProps {
  readonly guildId?: string
}

interface MainState {
  guild: PartialGuild | null
  guildFetchDone: boolean
  membersFetchDone: boolean
  members: MemberMinimal[] | null
}

export default class Main extends Component<MainProps, MainState> {
  state: MainState = {
    guild: null,
    guildFetchDone: false,
    membersFetchDone: false,
    members: null
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.getGuild(token)
      this.getMembers(token)
    }
    else {
      window.location.assign('/login')
    }
  }

  getGuild = async (token: string) => {
    await axios.get(urljoin(api, '/discord/users/@me/guilds'), {
      headers: {
        token: token
      }
    })
      .then(res => {
        let guild = res.data
          .find((one: PartialGuild) => one.id === this.props.guildId)
        this.setState({ guild: guild })
      })
      .catch(e => {
        this.setState({ guild: null })
        console.log(e)
      })
      .finally(() => {
        this.setState({ guildFetchDone: true })
      })
  }

  getMembers = async (token: string) => {
    try {
      let res = await axios.get(`${api}/discord/guilds/${this.props.guildId}/members`, {
        headers: {
          token: token
        }
      })
      console.log(res.data)
      this.setState({ members: res.data })
    }
    catch (e) {
      this.setState({ members: null })
    }
    finally {
      this.setState({ membersFetchDone: true })
    }
  }

  render() {
    const guild = this.state.guild

    return this.state.guildFetchDone && this.state.membersFetchDone ? (
      <div style={{
        fontFamily: 'NanumBarunGothic'
      }}>
        <Row>
          <h3>서버 정보</h3>
        </Row>
        <Row className="dashboard-section">
          <Col className="col-auto">
            <Card className="flex-md-row my-3 shadow" bg="dark">
              <Card.Body className="text-center text-md-left">
                <div style={{
                  height: 120,
                  width: 120
                }}>
                  {guild?.icon
                    ? <Card.Img
                      src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png?size=512`}
                    />
                    : <h1 className="d-flex justify-content-center align-items-center w-100 h-100 display-3">{guild?.name[0]}</h1>
                  }
                </div>
              </Card.Body>
              <Card.Body className="pl-md-0 pr-md-5" style={{

              }}>
                <Card.Title className="font-weight-bold text-center text-md-left" style={{
                  fontFamily: 'NanumSquare'
                }}>
                  {guild?.name}
                </Card.Title>
                <Card.Text as="div" className="lines">
                  <p>
                    전체 멤버 수: x
                  </p>
                  <p>
                    온라인 멤버 수: y
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col />
        </Row>

        <Row className="justify-content-between">
          <h3>알림 센터</h3>
          <div>
            <Button variant="secondary" size="sm">더 보기</Button>
          </div>
        </Row>
        <Row className="dashboard-section">
          <Col xs={3}>
            <Card className="Dashboard-card my-3 shadow" bg="dark">
              <Card.Body>
                <Card.Title>개발 중</Card.Title>
                <Card.Text>
                  <span className="font-weight-bold">이 기능</span>은 개발 중입니다.
                </Card.Text>
                <Button variant="secondary" size="sm">자세히</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    ) : <Container className="d-flex align-items-center justify-content-center flex-column" style={{
      height: '500px'
    }}>
        <h3 className="pb-4">불러오는 중</h3>
        <Spinner animation="border" variant="aztra" />
      </Container>
  }
}