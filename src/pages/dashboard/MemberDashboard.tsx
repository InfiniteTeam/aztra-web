import React, { Component } from 'react';

import axios from 'axios'
import api from '../../datas/api'
import { MemberExtended, PartialGuild } from '../../types/DiscordTypes';
import { match } from 'react-router-dom';
import { Row, Col, Card, Container, Spinner, Badge, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl } from '@fortawesome/free-solid-svg-icons'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

interface MatchParams {
  readonly userid: string
  readonly serverid: string
}

interface Match extends match {
  readonly params: MatchParams
}

interface MemberDashboardProps {
  readonly match: Match
  readonly guild: PartialGuild | null
}

interface MemberDashboardState {
  member: MemberExtended | null
  fetchDone: boolean
  value: number
}

export default class MemberDashboard extends Component<MemberDashboardProps, MemberDashboardState> {
  state: MemberDashboardState = {
    member: null,
    fetchDone: false,
    value: 0
  }

  async componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      await this.getMember(token)
      await this.setState({ value: 0 })
      await setTimeout(() => this.setState({ value: 30 }), 200)
    }
    else {
      window.location.assign('/login')
    }
  }

  getMember = async (token: string) => {
    try {
      let res = await axios.get(`${api}/discord/guilds/${this.props.guild?.id}/members/${this.props.match.params.userid}`, {
        headers: {
          token: token
        }
      })
      this.setState({ member: res.data })
    }
    catch (e) {
      this.setState({ member: null })
    }
    finally {
      this.setState({ fetchDone: true })
    }
  }

  render() {
    var statusColor: string | null = null

    const member = this.state.member

    switch (member?.user.presence.status) {
      case 'online':
        statusColor = 'limegreen'
        break
      case 'dnd':
        statusColor = 'red'
        break
      case 'idle':
        statusColor = 'gold'
        break
      case 'offline':
      case 'invisible':
        statusColor = 'darkgrey'
        break
      default:
        break
    }

    return this.state.fetchDone
      ? (
        <>
          <Row className="dashboard-section justify-content-between">
            <h3>멤버 정보</h3>
            <div>
              <Button variant="aztra" size="sm" href={`/dashboard/${this.props.guild?.id}/members`}>
                <FontAwesomeIcon icon={faListUl} className="mr-2" />목록으로
              </Button>
            </div>
          </Row>

          <Row className="justify-content-center justify-content-sm-start">
            <div className="position-relative">
              <div style={{
                width: 128,
                height: 128
              }}>
                <img
                  alt={member?.user.username!}
                  className="rounded-circle no-drag"
                  src={member?.user.avatar ? `https://cdn.discordapp.com/avatars/${member?.user.id}/${member?.user.avatar}.jpeg?size=128` : member?.user.defaultAvatarURL}
                  style={{
                    width: 128,
                    height: 128
                  }}
                />
              </div>
              {statusColor && <div style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: statusColor,
                position: 'absolute',
                bottom: 1,
                right: 1,
                border: '7px solid #252a2e',
                backgroundClip: 'border-box'
              }} />}
            </div>
            <div className="text-center text-sm-left mt-4 mt-sm-0 px-4">
              <div style={{
                fontSize: '24pt'
              }}>
                {member?.displayName}
                {
                  member?.user.bot &&
                  <Badge variant="blurple" className="ml-2 font-weight-bold mt-2 align-text-top" style={{
                    fontSize: '11pt'
                  }}>
                    BOT
                  </Badge>
                }
              </div>
              <div style={{
                fontSize: '17pt'
              }}>
                {member?.user.username}
                <span className="ml-1 font-weight-bold" style={{
                  color: '#8f8f8f',
                  fontSize: '13pt'
                }}>
                  #{member?.user.discriminator}
                </span>
              </div>
            </div>
          </Row>

          <Row className="mt-5">
            <Col xs={12} sm={8} className="pt-4 d-flex">
              <div style={{
                width: 200,
                height: 200
              }}>

                <CircularProgressbarWithChildren value={this.state.value} strokeWidth={5} styles={{
                  path: {
                    stroke: "#8c53c6",
                    strokeLinecap: "butt",
                  },
                  trail: {
                    stroke: "#4d3663"
                  }
                }}>
                  <div className="text-center pt-2" style={{
                    color: "white",
                    fontFamily: "Teko"
                  }}>
                    <div style={{
                      fontSize: "4.5rem",
                      lineHeight: "3rem"
                    }}>
                      13
                      <span style={{
                        fontSize: '2rem'
                      }}>
                        LV
                      </span>
                    </div>
                    <div style={{
                      fontSize: "1.5rem"
                    }}>
                      1500/5000 P
                    </div>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <div className="pl-sm-5 d-flex align-items-center">
                <div style={{
                  fontFamily: "NanumSquare",
                  fontSize: '16pt'
                }}>
                  <p>
                    총 메시지 수 495개
                  </p>
                  <p>
                    하루 평균 메시지 수 34개
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <h4 className="mb-3">최근 활동</h4>
              <Card bg="dark" className="mb-2 shadow-sm">
                <Card.Body className="py-2">
                  {member?.user.username} 이(가) 방금 새로 들어왔습니다.
              </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )
      : <Container className="d-flex align-items-center justify-content-center flex-column" style={{
        height: '500px'
      }}>
        <h3 className="pb-4">불러오는 중</h3>
        <Spinner animation="border" variant="aztra" />
      </Container>
  }
}