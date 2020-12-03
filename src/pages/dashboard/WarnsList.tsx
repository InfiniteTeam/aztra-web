import React, { createRef, PureComponent, useRef, useState } from 'react';

import axios from 'axios'
import api from '../../datas/api'
import { Warns as WarnsType } from '../../types/dbtypes/warns';
import MobileAlert from '../../components/MobileAlert'
import { Row, Col, Form, Container, Spinner, Button, Table, ButtonGroup, OverlayTrigger, Tooltip, Popover, Modal, Overlay } from 'react-bootstrap';
import { MemberMinimal } from '../../types/DiscordTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { RemoveCircleOutline, FileCopy as FileCopyIcon, OpenInNew as OpenInNewIcon } from '@material-ui/icons'

export interface WarnsListProps {
  readonly guildId?: string
}

type WarnSearchType = 'reason' | 'target' | 'warnby'

type WarnSortType = 'latest' | 'oldest' | 'count' | 'count_least'

export interface WarnsListState {
  members: MemberMinimal[] | null
  membersFetchDone: boolean

  warns: WarnsType[] | null
  warnSearch: string
  warnsFetchDone: boolean

  searchType: WarnSearchType
  sortType: WarnSortType
}

interface MemberCellProps {
  member: MemberMinimal
  guildId: string
  wrap?: boolean
}

const MemberCell: React.FC<MemberCellProps> = ({ member, guildId, wrap = false }) => {
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
          <a href={`/dashboard/${guildId}/members/${member.user.id}`} {...triggerHandler} className="d-flex align-items-center">
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
            <div className={wrap ? "ml-lg-3" : "ml-3"}>
              <span className={`${wrap ? 'd-none d-lg-block' : ''} font-weight-bold`}>
                {member.displayName}
              </span>

            </div>
          </a>
        )
      }
    </OverlayTrigger>
    : <span className="font-italic">(존재하지 않는 멤버)</span>
}

interface WarnsListCardProps {
  target: MemberMinimal
  warnby: MemberMinimal
  warn: WarnsType
  guildId: string
}

const WarnsListCard: React.FC<WarnsListCardProps> = ({ target, warnby, warn, guildId }) => {
  {
    const [showInfo, setShowInfo] = useState(false)
    const [copied, setCopied] = useState(false)
    const warnReasonRef = useRef<HTMLParagraphElement>(null)
    const copyButtonRef = useRef<HTMLButtonElement>(null)

    return (
      <tr>
        <td className="align-middle text-center">
          <Form.Check style={{
            transform: 'scale(1.25)',
            WebkitTransform: 'scale(1.25)'
          }} />
        </td>
        <td className="align-middle">
          <div className="d-flex justify-content-center justify-content-lg-start">
            <MemberCell member={target!} guildId={guildId} wrap />
          </div>
        </td>
        <td className="align-middle d-none d-md-table-cell">
          <OverlayTrigger
            trigger="click"
            placement="top"
            overlay={
              <Popover id={`member-${warn.member}-warn-reason-details`} style={{
                maxWidth: 500
              }}>
                <Popover.Title className="font-weight-bold">
                  경고 사유 자세히
              </Popover.Title>
                <Popover.Content>
                  <div className="p-1">
                    {warn.reason}
                  </div>
                  <div className="d-flex my-2">
                    <Button size="sm" variant="secondary" className="d-flex align-items-center">
                      <FileCopyIcon className="mr-1" style={{ transform: 'scale(0.8)' }} />
                    복사하기
                  </Button>
                  </div>
                </Popover.Content>
              </Popover>
            }
          >
            <span className="d-inline-block text-truncate mw-100 align-middle cursor-pointer">
              {warn.reason}
            </span>
          </OverlayTrigger>
        </td>
        <td className="align-middle">{warn.count}회</td>
        <td className="align-middle">
          <div className="d-flex justify-content-center justify-content-lg-start">
            <MemberCell member={warnby!} guildId={guildId} wrap />
          </div>
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
              <Button variant="dark" className="d-flex px-1 remove-before">
                <RemoveCircleOutline />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="warn-list-row-remove-warn">
                  경고 자세히 보기
                </Tooltip>
              }
            >
              <Button variant="dark" className="d-flex px-1 remove-before" onClick={() => setShowInfo(true)}>
                <OpenInNewIcon />
              </Button>
            </OverlayTrigger>

            <Modal className="modal-dark" show={showInfo} onHide={() => setShowInfo(false)} centered size="lg">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{
                  fontFamily: "NanumSquare",
                  fontWeight: 900,

                }}>
                  경고 상세 정보
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="py-4">
                <Container>
                  <Row>
                    <Col xs={12} md={6}>
                      <h5 className="font-weight-bold">대상 멤버</h5>
                      <p>
                        <MemberCell guildId={guildId!} member={target} />
                      </p>
                    </Col>
                    <Col xs={12} md={6}>
                      <h5 className="font-weight-bold">경고 부여자</h5>
                      <p>
                        <MemberCell guildId={guildId!} member={warnby} />
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <h5 className="font-weight-bold">경고 횟수</h5>
                      <p>
                        {warn.count}회
                      </p>
                    </Col>
                    <Col xs={12} md={6}>
                      <h5 className="font-weight-bold">경고 날짜</h5>
                      <p>
                        {new Date(warn.dt).toLocaleString()}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h5 className="font-weight-bold">경고 사유</h5>
                      <p ref={warnReasonRef}>
                        {warn.reason}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer className="justify-content-between">
                <div>
                  <Button ref={copyButtonRef} variant="aztra" onClick={() => {
                    navigator.clipboard.writeText(warn.reason)
                      .then(async () => {
                        if (!copied) {
                          await setCopied(true)
                          await setTimeout(() => setCopied(false), 800)
                        }
                      })
                  }}>
                    <FileCopyIcon className="mr-2" style={{ transform: 'scale(0.9)' }} />
                    경고 사유 복사
                  </Button>

                  <Overlay target={copyButtonRef.current} show={copied}>
                    {(props) => (
                      <Tooltip id="wan-copied-tooltop" {...props}>
                        복사됨!
                      </Tooltip>
                    )}
                  </Overlay>
                </div>
                <Button variant="success" onClick={() => setShowInfo(false)}>닫기</Button>
              </Modal.Footer>
            </Modal>

          </ButtonGroup>
        </td>
      </tr>
    )
  }
}

export default class Members extends PureComponent<WarnsListProps, WarnsListState> {
  state: WarnsListState = {
    members: null,
    warnSearch: '',
    membersFetchDone: false,
    warns: null,
    warnsFetchDone: false,
    searchType: 'reason',
    sortType: 'latest'
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

  filterSortWarns = (search?: string) => (
    this.state.warns?.filter(one => {
      if (!search) return true
      let searchLowercase = search.toLowerCase()

      switch (this.state.searchType) {
        case 'reason':
          return one.reason.toLowerCase().includes(searchLowercase)
        case 'target':
          let target = this.state.members?.find(m => m.user.id === one.member)
          return target?.user.username?.toLowerCase()?.includes(searchLowercase) || target?.nickname?.toLowerCase()?.includes(searchLowercase)
        case 'warnby':
          let warnby = this.state.members?.find(m => m.user.id === one.warnby)
          return warnby?.user.username?.toLowerCase()?.includes(searchLowercase) || warnby?.nickname?.toLowerCase()?.includes(searchLowercase)
        default:
          return false
      }
    })?.sort((a, b) => {
      switch (this.state.sortType) {
        case 'latest':
          return new Date(b.dt).getTime() - new Date(a.dt).getTime()
        case 'oldest':
          return new Date(a.dt).getTime() - new Date(b.dt).getTime()
        case 'count':
          return b.count - a.count
        case 'count_least':
          return a.count - b.count
        default:
          return 0
      }
    })!
  )

  handleSearchOnChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    await this.setState({ warnSearch: e.target.value })
  }

  handleSearchTypeOnChange = (searchType: WarnSearchType) => {
    this.setState({ searchType: searchType })
    if (this.searchRef.current) {
      this.searchRef.current.value = ''
      this.setState({ warnSearch: '' })
    }
  }

  handleSortTypeOnChange = (sortType: WarnSortType) => {
    this.setState({ sortType: sortType })
  }

  searchRef = createRef<HTMLInputElement>()

  render() {
    const warns = (
      (this.filterSortWarns(this.state.warnSearch) || this.state.warns)?.map(one => {
        const target = this.state.members?.find(m => m.user.id === one.member)
        const warnby = this.state.members?.find(m => m.user.id === one.warnby)
        return <WarnsListCard target={target!} warnby={warnby!} warn={one} guildId={this.props.guildId!} />
      })
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
          <MobileAlert />
        </Row>
        <Row>
          <Col>
            {
              this.state.membersFetchDone && this.state.warnsFetchDone
                ? <Form>
                  <Form.Group>
                    <Row className="pb-2 justify-content-between">
                      <Col
                        className="d-flex align-items-end mt-4 mt-xl-0 px-0"
                        xs={{
                          span: 0,
                          order: "last"
                        }}
                        xl={{
                          order: "first"
                        }}
                        style={{
                          fontSize: '12pt'
                        }}>
                        전체 경고 {this.state.warns?.length} 건{this.state.warnSearch && `, ${warns.length}건 검색됨`}
                      </Col>
                      <Col
                        className="px-0"
                        xs={{
                          span: "auto",
                          order: "first"
                        }}
                        xl={{
                          span: "auto",
                          order: "last"
                        }}>
                        <div className="d-flex">
                          <span>검색 조건:</span>
                          <div className="d-lg-flex">
                            <Form.Check className="ml-4" type="radio" label="경고 사유" checked={this.state.searchType === 'reason'} style={{ wordBreak: 'keep-all' }} onChange={() => this.handleSearchTypeOnChange('reason')} />
                            <Form.Check className="ml-4" type="radio" label="대상 멤버" checked={this.state.searchType === 'target'} style={{ wordBreak: 'keep-all' }} onChange={() => this.handleSearchTypeOnChange('target')} />
                            <Form.Check className="ml-4" type="radio" label="경고 부여자" checked={this.state.searchType === 'warnby'} style={{ wordBreak: 'keep-all' }} onChange={() => this.handleSearchTypeOnChange('warnby')} />
                          </div>
                        </div>
                        <div className="d-flex mt-4 mt-lg-0">
                          <span>정렬 조건:</span>
                          <div className="d-lg-flex">
                            <Form.Check className="ml-4" type="radio" label="최신순" checked={this.state.sortType === 'latest'} style={{ wordBreak: 'keep-all' }} onChange={() => this.handleSortTypeOnChange('latest')} />
                            <Form.Check className="ml-4" type="radio" label="과거순" checked={this.state.sortType === 'oldest'} style={{ wordBreak: 'keep-all' }} onChange={() => this.handleSortTypeOnChange('oldest')} />
                            <Form.Check className="ml-4" type="radio" label="경고수 많은순" checked={this.state.sortType === 'count'} style={{ wordBreak: 'keep-all' }} onChange={() => this.handleSortTypeOnChange('count')} />
                            <Form.Check className="ml-4" type="radio" label="경고수 적은순" checked={this.state.sortType === 'count_least'} style={{ wordBreak: 'keep-all' }} onChange={() => this.handleSortTypeOnChange('count_least')} />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <input hidden={true} />
                      <Form.Control ref={this.searchRef} type="text" placeholder="경고 검색" onChange={this.handleSearchOnChange} />
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
                            <th className="text-center text-md-left" style={{ width: '10%' }}>경고 횟수</th>
                            <th className="text-center text-md-left" style={{ width: '17%' }}>경고 부여자</th>
                            <th style={{ width: 100 }} />
                          </tr>
                        </thead>
                        <tbody>
                          {warns}
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