import React, { Component } from 'react';

import axios from 'axios'
import api from '../../datas/api'
import { MemberExtended } from '../../types/DiscordTypes';
import { match } from 'react-router-dom';
import { Row, Col, Card, Container, Spinner, Badge, Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug, faExclamationTriangle, faListUl, faStream, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import BackTo from '../../components/BackTo';

import { calcLevel, getAccumulateExp, getRequiredEXP } from '@aztra/level-utils'
import { Exp } from '../../types/dbtypes/exps';
import { numberCommaFormat } from '../../utils/numberComma';

interface MatchParams {
  readonly userid: string
}

interface Match extends match {
  readonly params: MatchParams
}

interface MemberDashboardProps {
  readonly match: Match
  readonly guildId?: string
}

interface MemberDashboardState {
  member: MemberExtended | null
  exps: Exp[] | null
  memberFetchDone: boolean
  expFetchDone: boolean
  showPercent: boolean
}

export default class MemberDashboard extends Component<MemberDashboardProps, MemberDashboardState> {
  state: MemberDashboardState = {
    member: null,
    exps: null,
    memberFetchDone: false,
    expFetchDone: false,
    showPercent: false
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.getMember(token)
      this.getExp(token).then(async () => {
        console.log(this.state.exps)
        await setTimeout(() => this.setState({ showPercent: true }), 200)
      })
    }
    else {
      window.location.assign('/login')
    }
  }

  getMember = async (token: string) => {
    try {
      let res = await axios.get(`${api}/discord/guilds/${this.props.guildId}/members/${this.props.match.params.userid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.setState({ member: res.data })
    }
    finally {
      this.setState({ memberFetchDone: true })
    }
  }

  getExp = async (token: string) => {
    try {
      let res = await axios.get(`${api}/servers/${this.props.guildId}/exps`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.setState({ exps: res.data })
    }
    finally {
      this.setState({ expFetchDone: true })
    }
  }

  render() {
    var statusColor: string | null = null
    var statusName: string | null = null

    const member = this.state.member
    const isBot = member?.user.bot

    switch (member?.user.presence.status) {
      case 'online':
        statusColor = 'limegreen'
        statusName = '온라인'
        break
      case 'dnd':
        statusColor = 'red'
        statusName = '다른 용무 중'
        break
      case 'idle':
        statusColor = 'gold'
        statusName = '자리 비움'
        break
      case 'offline':
      case 'invisible':
        statusColor = 'darkgrey'
        statusName = '오프라인'
        break
      default:
        break
    }

    const exp = this.state.exps?.find(m => m.id === member?.user.id)?.exp!
    const level = calcLevel(exp)
    const reqExp = getRequiredEXP(level)
    const accuExp = getAccumulateExp(level)
    const reqCompleted = (reqExp || 0) - accuExp + exp
    let expIndex = this.state.exps?.sort((a, b) => b.exp - a.exp).findIndex(m => m.id === member?.user.id)

    let expRank
    switch (expIndex) {
      case -1:
      case undefined:
        expRank = undefined
        break
      default:
        expRank = expIndex + 1
    }

    return this.state.memberFetchDone && this.state.expFetchDone
      ? (
        <div>
          <Row className="dashboard-section">
            <div>
              <BackTo className="pl-2 mb-4" name="멤버 목록" href={`/dashboard/${this.props.guildId}/members`} />
              <div className="d-flex">
                <h3>멤버 관리</h3>
                <div className="ml-4">
                  <Button variant="aztra" size="sm" href={`/dashboard/${this.props.guildId}/members`}>
                    <FontAwesomeIcon icon={faListUl} className="mr-2" />목록으로
                  </Button>
                </div>
              </div>
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
                  src={member?.user.avatar ? `https://cdn.discordapp.com/avatars/${member?.user.id}/${member?.user.avatar}` : member?.user.defaultAvatarURL}
                  style={{
                    width: 128,
                    height: 128
                  }}
                />
              </div>
              {
                statusColor && (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="member-status-tooltip">
                        {statusName}
                      </Tooltip>
                    }
                  >
                    <div style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      backgroundColor: statusColor,
                      position: 'absolute',
                      bottom: 1,
                      right: 1,
                      border: '7px solid #252a2e',
                      backgroundClip: 'border-box'
                    }} />
                  </OverlayTrigger>
                )
              }
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

          <Row className="my-5">
            {!isBot && <Col xs={12} xl={5} className="pt-4 pb-5 d-md-flex">
              <div className="mx-auto mx-md-0" style={{
                maxWidth: 200,
                maxHeight: 200
              }}>

                <CircularProgressbarWithChildren value={this.state.showPercent ? reqExp ? reqCompleted / reqExp * 100 : 100 : 0} strokeWidth={5} styles={{
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
                      {level}
                      <span style={{
                        fontSize: '2rem'
                      }}>
                        LV
                      </span>
                    </div>
                    <div style={{
                      fontSize: "1.5rem"
                    }}>
                      {reqExp ? numberCommaFormat(reqCompleted) : '--'}/{reqExp ? numberCommaFormat(reqExp) : '--'} P
                    </div>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <div className="pl-md-5 mt-4 mt-md-0 d-flex align-items-center justify-content-center justify-content-md-left">
                <div style={{
                  fontFamily: "NanumSquare",
                  fontSize: '13pt'
                }}>
                  <div className="pb-2 font-weight-bold" style={{
                    fontSize: '20pt'
                  }}>
                    <FontAwesomeIcon icon={faStream} className="mr-3" />
                    서버 {expRank || '--'}위
                  </div>
                  <div>
                    총 경험치:{' '}
                    <span style={{
                      fontSize: '17pt'
                    }}>
                      {numberCommaFormat(exp)}
                    </span>
                  </div>
                </div>
              </div>
            </Col>}
            <Col xs={12} xl={isBot ? 12 : 7}>
              <div className={`d-flex ${!isBot && 'justify-content-between'}`}>
                <h4 className="mb-3">최근 활동</h4>
                <div className={`${isBot && 'ml-3'}`}>
                  <Button variant="aztra" size="sm">더보기</Button>
                </div>
              </div>
              <Card bg="dark" className="mb-2 shadow-sm">
                <Card.Body className="py-2 d-flex justify-content-between">
                  <div>
                    <FontAwesomeIcon icon={faBug} className="mr-2" />
                    알파를 버그로 오지게 뚜드렸습니다.
                  </div>
                  <small style={{
                    color: 'lightgrey'
                  }}>
                    방금
                  </small>
                </Card.Body>
              </Card>
              <Card bg="dark" className="mb-2 shadow-sm">
                <Card.Body className="py-2 d-flex justify-content-between">
                  <div>
                    <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
                    닉네임을 변경했습니다.
                    <code> Aztra</code>
                    {' → '}
                    <code>아즈트라</code>
                  </div>
                  <small style={{
                    color: 'lightgrey'
                  }}>
                    3시간 전
                  </small>
                </Card.Body>
              </Card>
              <Card bg="dark" className="mb-2 shadow-sm">
                <Card.Body className="py-2 d-flex justify-content-between">
                  <div>
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    {member?.user.username} 이(가) 새로 들어왔습니다.
                  </div>
                  <small style={{
                    color: 'lightgrey'
                  }}>
                    2개월 전
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col className="pb-5" xs={12} lg={4}>
              <div className="d-flex justify-content-between">
                <h4 className="mb-3">받은 경고</h4>
                <div>
                  <Button variant="aztra" size="sm">더보기</Button>
                </div>
              </div>
              <Card bg="dark" className="mb-2 shadow-sm">
                <Card.Body className="py-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                  버그로 도배
                </Card.Body>
              </Card>
              <Card bg="dark" className="mb-2 shadow-sm">
                <Card.Body className="py-2">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                  심한 욕설... 은 아니고 심한 오류 메시지를 뱉음
                </Card.Body>
              </Card>
            </Col>
            <Col className="pb-5" xs={12} lg={4}>
              <h4 className="mb-3">티켓</h4>
              <Alert variant="aztra">
                현재 이 멤버에 열린 티켓이 없습니다!
              </Alert>
            </Col>
          </Row>
        </div>
      )
      : <Container className="d-flex align-items-center justify-content-center flex-column" style={{
        height: '500px'
      }}>
        <h3 className="pb-4">불러오는 중</h3>
        <Spinner animation="border" variant="aztra" />
      </Container>
  }
}