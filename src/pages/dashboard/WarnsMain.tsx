import React from 'react'
import api from '../../datas/api'
import axios from 'axios'
import { Warns as WarnsType } from '../../types/dbtypes/warns'
import { Button, Card, Col, OverlayTrigger, Popover, Row, Spinner, Table } from 'react-bootstrap'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Menu as MenuIcon } from '@material-ui/icons'

import dayjs from 'dayjs'
import dayjsRelativeTime from 'dayjs/plugin/relativeTime'
import dayjsUTC from 'dayjs/plugin/utc'
import 'dayjs/locale/ko'
import { MemberMinimal } from '../../types/DiscordTypes'
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

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.getWarns(token)
      this.getMembers(token)
      console.log(this.state.data)
    }
    else {
      window.location.assign('/login')
    }
  }

  render() {
    return (
      <div>
        <Row className="dashboard-section">
          <h3>경고 관리</h3>
        </Row>
        <Row>
          <Col className="mb-5" xs={12} lg={6}>
            <div className="d-flex justify-content-between">
              <h4 className="mb-3">최근 경고 목록</h4>
              <div>
                <Button variant="aztra" className="shadow align-items-center d-flex" size="sm" href={`/dashboard/${this.props.guildId}/warns-list`}>
                  <MenuIcon className="mr-2" />
                  모두 보기
                </Button>
              </div>
            </div>
            {
              this.state.warnsFetchDone && this.state.membersFetchDone
                ? this.state.data?.length
                  ?
                  this.state.data?.sort((a, b) =>
                    new Date(b.dt).getTime() - new Date(a.dt).getTime()
                  )?.map(one => {
                    const target = this.state.members?.find(m => m.user.id === one.member)?.user
                    return <Card bg="dark" className="mb-2 shadow-sm shadow">
                      <Card.Body as={Row} className="py-2 d-flex justify-content-between">
                        <Col xs={9} md={10} className="d-flex">
                          <div className="mr-2 my-auto" style={{
                            height: 35,
                            width: 35
                          }}>
                            <img
                              src={target?.avatar ? `https://cdn.discordapp.com/avatars/${target?.id}/${target?.avatar}` : target?.defaultAvatarURL}
                              alt={target?.tag!}
                              className="rounded-circle no-drag"
                              style={{
                                height: 35,
                                width: 35
                              }}
                            />
                          </div>
                          <div className="my-auto d-inline-block text-truncate" style={{

                          }}>
                            {one.reason}
                          </div>
                        </Col>
                        <Col xs={3} md={2} className="d-flex align-items-center my-0 justify-content-end">
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
                    <div className="my-4" style={{color: 'lightgray'}}>경고가 하나도 없습니다! 평화롭네요.</div>
                  </div>
                : (
                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <h3 className="pb-4">불러오는 중</h3>
                    <Spinner animation="border" variant="aztra" />
                  </div>
                )

            }
          </Col>

          <Col className="mb-5" xs={12} lg={6}>
            <div className="d-flex justify-content-between">
              <h4 className="mb-3">멤버 경고 순위</h4>
              <div>
                <Button variant="aztra" className="shadow" size="sm">더보기</Button>
              </div>
            </div>
            <Card bg="dark" className="mb-2 shadow-sm shadow">
              <Card.Body className="py-2">
                <FontAwesomeIcon icon={faTrophy} className="mr-2" color="gold" />
                1위 - Aztra
              </Card.Body>
            </Card>
            <Card bg="dark" className="mb-2 shadow-sm shadow">
              <Card.Body className="py-2">
                <FontAwesomeIcon icon={faTrophy} className="mr-2" color="silver" />
                2위 - ArpaAP
              </Card.Body>
            </Card>
            <Card bg="dark" className="mb-2 shadow-sm shadow">
              <Card.Body className="py-2">
                <FontAwesomeIcon icon={faTrophy} className="mr-2" color="chocolate" />
                3위 - Dacon
              </Card.Body>
            </Card>
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
            <Table variant="dark" hover>
              <thead>
                <tr>
                  <th>경고 수</th>
                  <th>수행할 작업</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>4회</td>
                  <td>해당 멤버 추방</td>
                </tr>
                <tr>
                  <td>7회</td>
                  <td>해당 멤버 차단</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}