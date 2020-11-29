import React, { PureComponent, useRef } from 'react';

import axios from 'axios'
import api from '../../datas/api'
import { Warns as WarnsType } from '../../types/dbtypes/warns';
import { Row, Col, Form, Container, Spinner, Button, Table, ButtonGroup, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import MemberListCard from '../../components/forms/MemberListCard';
import { MemberMinimal } from '../../types/DiscordTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline'

export interface WarnsListProps {
  readonly guildId?: string
}

export interface WarnsListState {
  members: MemberMinimal[] | null
  memberSearch: string
  membersFetchDone: boolean

  warns: WarnsType[] | null
  warnsFetchDone: boolean

  searchType: 'reason' | 'target' | 'warnby'
}

interface MemberCellProps {
  member: MemberMinimal
  guildId: string
}

const MemberCell: React.FC<MemberCellProps> = ({ member, guildId }) => {

  return member !== undefined
    ?
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`member-${member.user.id}-tag-tooltip`}>
          @{member.user.tag}
        </Tooltip>
      }
    >
      {
        ({ ref, ...triggerHandler }) => (
          <a href={`/dashboard/${guildId}/members/${member.user.id}`} {...triggerHandler} className="d-flex align-items-center justify-content-center justify-content-lg-start">
            <img
              ref={ref}
              className="rounded-circle no-drag"
              src={member.user.avatar ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}` : member.user.defaultAvatarURL}
              alt={member.user.tag!}
              style={{
                height: 30,
                width: 30
              }}
              {...triggerHandler}
            />
            <div className="ml-3 d-none d-lg-block">
              <span className="font-weight-bold">
                {member.displayName}
              </span>

            </div>
          </a>
        )
      }
    </OverlayTrigger>
    : <span className="font-italic">(존재하지 않는 멤버)</span>
}

export default class Members extends PureComponent<WarnsListProps, WarnsListState> {
  state: WarnsListState = {
    members: null,
    memberSearch: '',
    membersFetchDone: false,
    warns: null,
    warnsFetchDone: false,
    searchType: 'reason'
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.getMembers(token)
      this.getWarns(token)
    }
    else {
      window.location.assign('/login')
    }
  }

  getWarns = async (token: string) => {
    try {
      let res = await axios.get(`${api}/servers/${this.props.guildId}/warns`, {
        headers: {
          token: token
        }
      })
      this.setState({ warns: res.data })
    }
    catch (e) {
      this.setState({ warns: null })
    }
    finally {
      this.setState({ warnsFetchDone: true })
    }
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

  filterMembers = (search?: string) => {
    var x = this.state.members?.filter(one =>
      !search || one.user.username?.toLowerCase()?.includes(search.toLowerCase()) || one.nickname?.toLowerCase()?.includes(search.toLowerCase())
    )?.sort((a, b) => {
      let aDname = a.displayName!
      let bDname = b.displayName!
      if (aDname > bDname) return 1
      else if (aDname < bDname) return -1
      return 0
    })!
    return x
  }

  handleSearchOnChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    console.time()
    await this.setState({ memberSearch: e.target.value })
    console.timeEnd()
  }

  render() {
    const warns = (
      (this.filterMembers(this.state.memberSearch) || this.state.members)?.map(one => <MemberListCard key={one.user.id} member={one} guildId={this.props.guildId!} />)
    )

    return (
      <div style={{
        fontFamily: 'NanumBarunGothic'
      }}>
        <Row className="dashboard-section">
          <div>
            <a className="d-flex align-items-center pl-2" href={`/dashboard/${this.props.guildId}/warns`}>
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
              [경고 관리] 로 돌아가기
            </a>
            <h3 className="mt-4">전체 경고 목록</h3>
          </div>
        </Row>
        <Row className="d-md-none">
          <Alert variant="warning" className="d-flex">
            <FontAwesomeIcon icon={faExclamationTriangle} color="darkorange" size="lg" className="my-auto mr-2" />
            이 페이지는 좁은 모바일 화면에서 확인하기 불편하기에 PC 버전에서 이용하시는 것을 권장드립니다.
          </Alert>
        </Row>
        <Row>
          <Col>
            {
              this.state.membersFetchDone && this.state.warnsFetchDone
                ? <Form>
                  <Form.Group>
                    <Row className="pb-2 justify-content-between">
                      <Form.Text style={{
                        fontSize: '12pt'
                      }}>
                        전체 경고 {this.state.warns?.length} 건{this.state.memberSearch && `, ${[].length}건 검색됨`}
                      </Form.Text>
                      <div className="my-auto d-flex">
                        <span>검색 조건:</span>
                        <Form.Check className="ml-4" type="radio" label="경고 사유" style={{ wordBreak: 'keep-all' }} />
                        <Form.Check className="ml-4" type="radio" label="대상 멤버" style={{ wordBreak: 'keep-all' }} />
                        <Form.Check className="ml-4" type="radio" label="경고 부여자" style={{ wordBreak: 'keep-all' }} />
                      </div>
                    </Row>

                    <Row className="mb-2">
                      <input hidden={true} />
                      <Form.Control type="text" placeholder="경고 검색" onChange={this.handleSearchOnChange} />
                    </Row>

                    <Row className="flex-column">
                      <Table id="warn-list-table" variant="dark" style={{
                        tableLayout: 'fixed'
                      }} >
                        <thead>
                          <tr>
                            <th className="align-middle text-center" style={{ width: 50 }}>
                              <Form.Check style={{
                                transform: 'scale(1.25)',
                                WebkitTransform: 'scale(1.25)'
                              }} />
                            </th>
                            <th className="text-center text-md-left" style={{ width: '17%' }}>대상 멤버</th>
                            <th className="text-center text-md-left d-none d-md-table-cell">경고 사유</th>
                            <th className="text-center text-md-left" style={{ width: '8%' }}>경고 횟수</th>
                            <th className="text-center text-md-left" style={{ width: '17%' }}>경고 부여자</th>
                            <th style={{ width: 70 }} />
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.warns?.map(one => {
                              const target = this.state.members?.find(m => m.user.id === one.member)
                              const warnby = this.state.members?.find(m => m.user.id === one.warnby)
                              return <tr>
                                <td className="align-middle text-center">
                                  <Form.Check style={{
                                    transform: 'scale(1.25)',
                                    WebkitTransform: 'scale(1.25)'
                                  }} />
                                </td>
                                <td className="align-middle">
                                  <MemberCell member={target!} guildId={this.props.guildId!} />
                                </td>
                                <td className="align-middle d-none d-md-table-cell">
                                  <span className="d-inline-block text-truncate mw-100 align-middle">
                                    {one.reason}
                                  </span>
                                </td>
                                <td className="align-middle">{one.count}회</td>
                                <td className="align-middle">
                                  <MemberCell member={warnby!} guildId={this.props.guildId!} />
                                </td>
                                <td className="align-middle text-center">
                                  <ButtonGroup>
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip id="warn-list-row-remove-warn">
                                          이 경고 취소하기
                                        </Tooltip>
                                      }
                                    >
                                      <Button variant="dark" className="d-flex">
                                        <RemoveCircleOutline />
                                      </Button>
                                    </OverlayTrigger>
                                  </ButtonGroup>
                                </td>
                              </tr>
                            })
                          }
                        </tbody>
                      </Table>
                    </Row>
                  </Form.Group>
                </Form>
                : <Container className="d-flex align-items-center justify-content-center flex-column" style={{
                  height: '500px'
                }}>
                  <h3 className="pb-4 text-center">경고 목록을 가져오고 있습니다...</h3>
                  <Spinner animation="border" variant="aztra" />
                </Container>
            }
          </Col>
        </Row>
      </div>
    )
  }
}