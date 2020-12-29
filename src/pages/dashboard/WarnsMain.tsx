import React from 'react'
import api from '../../datas/api'
import axios from 'axios'
import { Warns as WarnsType } from '../../types/dbtypes/warns'
import { Button, Card, Col, Container, OverlayTrigger, Popover, Row, Spinner, Tooltip } from 'react-bootstrap'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Menu as MenuIcon } from '@material-ui/icons'

import dayjs from 'dayjs'
import dayjsRelativeTime from 'dayjs/plugin/relativeTime'
import dayjsUTC from 'dayjs/plugin/utc'
import 'dayjs/locale/ko'
import { MemberMinimal } from '../../types/DiscordTypes'
import { Link } from 'react-router-dom'
dayjs.locale('ko')
dayjs.extend(dayjsRelativeTime)
dayjs.extend(dayjsUTC)


export interface WarnsMainProps {
  guildId: string
}

export interface WarnsMainState {
  data: WarnsType[] | null
  warnsFetchDone: boolean
  membersFetchDone: boolean
  members: MemberMinimal[] | null
}

export default class WarnsMain extends React.Component<WarnsMainProps, WarnsMainState> {
  state: WarnsMainState = {
    data: null,
    warnsFetchDone: false,
    membersFetchDone: false,
    members: null
  }

  getWarns = async (token: string) => {
    try {
      let res = await axios.get(`${api}/servers/${this.props.guildId}/warns`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.setState({ data: res.data })
    }
    catch (e) {
      this.setState({ data: null })
    }
    finally {
      this.setState({ warnsFetchDone: true })
    }
  }

  getMembers = async (token: string) => {
    try {
      let res = await axios.get(`${api}/discord/guilds/${this.props.guildId}/members`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.setState({ members: res.data })
    }
    catch (e) {
      this.setState({ members: null })
    }
    finally {
      this.setState({ membersFetchDone: true })
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.getWarns(token)
      this.getMembers(token)
    }
  }

  render() {
    let warnsRank: { [key: string]: number } = {}
    for (let one of this.state.data || []) {
      if (warnsRank[one.member] === undefined) {
        warnsRank[one.member] = 1
      }
      else {
        warnsRank[one.member] += one.count
      }
    }

    let warnsRankArray = Object.entries(warnsRank).sort((a, b) => b[1] - a[1])

    return this.state.warnsFetchDone && this.state.membersFetchDone ? (
      <div>
        <Row className="dashboard-section">
          <h3>경고 관리</h3>
        </Row>
        <Row>
          <Col className="mb-5" xs={12} lg={6}>
            <div className="d-flex justify-content-between">
              <h4 className="mb-3">최근 경고 목록</h4>
              <div>
                <Button as={Link} variant="aztra" className="shadow align-items-center d-flex" size="sm" to={`/dashboard/${this.props.guildId}/warns-list`}>
                  <MenuIcon className="mr-2" />
                  모두 보기
                </Button>
              </div>
            </div>
            {
              this.state.data?.length
                ?
                this.state.data
                  ?.sort((a, b) => new Date(b.dt).getTime() - new Date(a.dt).getTime())
                  .slice(0, 5)
                  .map(one => {
                    const target = this.state.members?.find(m => m.user.id === one.member)?.user
                    return <Card bg="dark" className="mb-2 shadow-sm shadow">
                      <Card.Body as={Row} className="py-1 d-flex justify-content-between">
                        <Col xs={9} className="d-flex px-2">
                          <div className="mr-2 my-auto" style={{
                            height: 35,
                            width: 35
                          }}>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id={`warn-member-${one.member}`}>
                                  {target?.tag}
                                </Tooltip>
                              }
                            >
                              <Link to={`/dashboard/${this.props.guildId}/members/${target?.id}`}>
                                <img
                                  src={target?.avatar ? `https://cdn.discordapp.com/avatars/${target?.id}/${target?.avatar}` : target?.defaultAvatarURL}
                                  alt={target?.tag!}
                                  className="rounded-circle no-drag"
                                  style={{
                                    height: 35,
                                    width: 35
                                  }}
                                />
                              </Link>
                            </OverlayTrigger>
                          </div>
                          <div className="my-auto d-inline-block text-truncate">
                            {one.reason}
                          </div>
                        </Col>
                        <Col xs={3} className="d-flex px-2 align-items-center my-0 justify-content-end">
                          <div className="my-auto small" style={{
                            color: 'lightgrey'
                          }}>
                            <div className="text-right">
                              {one.count}회
                          </div>
                            <div className="text-right">
                              {dayjs.utc(one.dt).local().fromNow()}
                            </div>
                          </div>
                        </Col>
                      </Card.Body>
                    </Card>
                  })
                : <div className="d-flex align-items-center justify-content-center h-75">
                  <div className="my-4" style={{ color: 'lightgray' }}>경고가 하나도 없습니다! 평화롭네요.</div>
                </div>
            }
          </Col>

          <Col className="mb-5" xs={12} lg={6}>
            <div className="d-flex justify-content-between">
              <h4 className="mb-3">멤버 경고 순위</h4>
              <div>
                <Button variant="aztra" className="shadow" size="sm">더보기</Button>
              </div>
            </div>
            <div>
              {
                warnsRankArray
                  .slice(0, 3)
                  .map(one => {
                    const rank = warnsRankArray.map(o => o[1]).indexOf(one[1]) + 1
                    const target = this.state.members?.find(m => m.user.id === one[0])
                    return (
                      <Card bg="dark" className="mb-2 shadow-sm shadow">
                        <Card.Body className="py-2">
                          <FontAwesomeIcon icon={faTrophy} className="mr-2" color={rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "chocolate" : undefined} />
                          {`${rank}위 - `}
                          <Link className="font-weight-bold" to={`/dashboard/${this.props.guildId}/members/${target?.user.id}`}>
                            {target?.displayName}
                          </Link>
                          {` (${one[1]}회)`}
                        </Card.Body>
                      </Card>
                    )
                  })
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex">
              <h4 className="mb-3">자동 작업 수행</h4>
              <div>
                <OverlayTrigger
                  trigger="hover"
                  overlay={
                    <Popover id="auto-task-process-popover">
                      <Popover.Title>
                        자동 작업 수행
                    </Popover.Title>
                      <Popover.Content>
                        일정 횟수 이상의 경고를 받거나 해제되었을 때 자동으로 수행할 작업을 정할 수 있습니다.
                    </Popover.Content>
                    </Popover>
                  } delay={{
                    show: 200,
                    hide: 150
                  }}>
                  <FontAwesomeIcon className="cursor-pointer ml-3" icon={faQuestionCircle} size="lg" color="grey" />
                </OverlayTrigger>
              </div>
            </div>
            <div>
              나중에 개발될 기능입니다!
            </div>
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