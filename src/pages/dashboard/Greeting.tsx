import React, { Component } from 'react';
import { Button, Row, Col, Form, Spinner, Container, Card, Alert } from 'react-bootstrap'
import TextareaAutosize from 'react-textarea-autosize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import { PartialGuild } from '../../types/DiscordTypes'

import axios from 'axios'

import { Greetings } from '../../types/dbtypes/greetings'
import api from '../../datas/api'
import { GuildChannel } from 'discord.js';

interface GreetingProps {
  readonly guild: PartialGuild | null
}

interface Validations {
  incomingTitle: boolean | null
  incomingDesc: boolean | null
  outgoingTitle: boolean | null
  outgoingDesc: boolean | null
}

interface GreetingState {
  data: Greetings | null
  fetchDone: boolean
  useJoin: boolean
  useLeave: boolean
  saving: boolean
  channels: GuildChannel[] | null
  channelFetchDone: boolean
  channelSearch: string
  newChannel: GuildChannel | null
  filteredChannels: GuildChannel[] | null
  validations: Validations
}

export default class Greeting extends Component<GreetingProps, GreetingState> {
  state: GreetingState = {
    data: null,
    fetchDone: false,
    useJoin: false,
    useLeave: false,
    saving: false,
    channels: null,
    channelFetchDone: false,
    channelSearch: '',
    newChannel: null,
    filteredChannels: null,
    validations: {
      incomingTitle: null,
      incomingDesc: null,
      outgoingTitle: null,
      outgoingDesc: null
    }
  }

  getData = async (token: string) => {
    try {
      let res = await axios.get(`${api}/servers/${this.props.guild?.id}/greeting`, {
        headers: {
          token: token
        }
      })
      this.setState({ data: res.data })
    }
    catch (e) {
      this.setState({ data: null })
    }
    finally {
      this.setState({ fetchDone: true })
    }
  }

  getChannels = async (token: string) => {
    try {
      let res = await axios.get(`${api}/discord/guilds/${this.props.guild?.id}/channels`, {
        headers: {
          token: token
        }
      })
      this.setState({ channels: res.data })
    }
    catch (e) {
      this.setState({ channels: null })
    }
  }

  async componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      await this.getData(token)
      this.getChannels(token)
      console.log(this.state.data)
      const data = this.state.data
      const useJoin = data?.join_title_format || data?.join_desc_format
      const useLeave = data?.leave_title_format || data?.leave_desc_format
      this.setState({
        useJoin: !!useJoin,
        useLeave: !!useLeave
      })
    }
    else {
      window.location.assign('/login')
    }
  }

  handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, type: 'incomingTitle' | 'incomingDesc' | 'outgoingTitle' | 'outgoingDesc') => {
    const changeState = (prev: Readonly<GreetingState>, changed: Object) => ({
      ...prev,
      validations: {
        ...prev.validations,
        ...changed
      }
    })

    var changed: Object
    switch (type) {
      case 'incomingTitle':
        changed = { incomingTitle: e.target.value.length > 256 ? false : null }
        break
      case 'outgoingTitle':
        changed = { outgoingTitle: e.target.value.length > 256 ? false : null }
        break
      case 'incomingDesc':
        changed = { incomingDesc: e.target.value.length > 2048 ? false : null }
        break
      case 'outgoingDesc':
        changed = { outgoingDesc: e.target.value.length > 2048 ? false : null }
        break
    }

    this.setState(prev => changeState(prev, changed))
  }

  render() {
    const checkMark = <FontAwesomeIcon icon={faCheckCircle} className="mr-2 my-auto text-success" size="lg" />

    return this.state.fetchDone ? (
      <div style={{
        fontFamily: 'NanumBarunGothic'
      }}>
        <Row className="dashboard-section">
          <h3>환영 메시지 설정</h3>
        </Row>
        <Row>
          <Col>
            <Form noValidate>
              <Row className="pb-2">
                <h4>반기는 메시지</h4>
              </Row>

              <Form.Group controlId="incomingUse">
                <Form.Check
                  type="switch"
                  label="반기는 메시지 사용"
                  checked={this.state.useJoin}
                  onClick={() => this.setState({ useJoin: !this.state.useJoin })}
                  aria-controls="incomingForm"
                  aria-expanded={!!this.state.useJoin}
                />
              </Form.Group>

              <div className={!this.state.useJoin ? "d-none" : undefined}>
                <Form.Group controlId="incomingTitle">
                  <Form.Label>메시지 제목</Form.Label>
                  <Form.Control isInvalid={this.state.validations.incomingTitle === false} as={TextareaAutosize} type="text" placeholder="예) {user}님, 안녕하세요!" defaultValue={this.state.data?.join_title_format || undefined} onChange={(e) => { this.handleFieldChange(e, 'incomingTitle') }} />
                  <Form.Control.Feedback type="invalid">최대 256자를 초과할 수 없습니다!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="incomingDesc">
                  <Form.Label>메시지 내용</Form.Label>
                  <Form.Control isInvalid={this.state.validations.incomingDesc === false} as={TextareaAutosize} type="text" placeholder="예) {guild}에 오신 것을 환영합니다." defaultValue={this.state.data?.join_desc_format || undefined} onChange={(e) => { this.handleFieldChange(e, 'incomingDesc') }} />
                  <Form.Control.Feedback type="invalid">최대 2048자를 초과할 수 없습니다!</Form.Control.Feedback>
                </Form.Group>
              </div>

              <Row className="pt-4 pb-2">
                <h4>보내는 메시지</h4>
              </Row>

              <Form.Group controlId="outgoingUse">
                <Form.Check
                  type="switch"
                  label="보내는 메시지 사용"
                  checked={this.state.useLeave}
                  onClick={() => this.setState({ useLeave: !this.state.useLeave })}
                  aria-controls="outgoingForm"
                  aria-expanded={!!this.state.useLeave}
                />
              </Form.Group>

              <div className={!this.state.useLeave ? "d-none" : undefined}>
                <Form.Group controlId="outgoingTitle">
                  <Form.Label>메시지 제목</Form.Label>
                  <Form.Control isInvalid={this.state.validations.outgoingTitle === false} as={TextareaAutosize} type="text" placeholder="예) {user}님, 안녕히가세요" defaultValue={this.state.data?.leave_title_format || undefined} onChange={(e) => { this.handleFieldChange(e, 'outgoingTitle') }} />
                  <Form.Control.Feedback type="invalid">최대 256자를 초과할 수 없습니다!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="outgoingDesc">
                  <Form.Label>메시지 내용</Form.Label>
                  <Form.Control isInvalid={this.state.validations.outgoingDesc === false} as={TextareaAutosize} type="text" placeholder="예) {user}님이 나갔습니다." defaultValue={this.state.data?.leave_desc_format || undefined} onChange={(e) => { this.handleFieldChange(e, 'outgoingDesc') }} />
                  <Form.Control.Feedback type="invalid">최대 2048자를 초과할 수 없습니다!</Form.Control.Feedback>
                </Form.Group>
              </div>

              <Row className="pt-4 pb-2">
                <h4 className="pr-5">전송 채널</h4>
              </Row>
              <Row>
                <Col md={8}>
                  {
                    this.state.useJoin || this.state.useLeave
                      ? <Form.Group>
                        <Container fluid>
                          <Row className="mb-3 flex-column">
                            {
                              this.state.newChannel || this.state.channels?.find(one => one.id === this.state.data?.channel)
                                ? <>
                                  <h5 className="pr-2">현재 선택됨: </h5>
                                  <Card bg="secondary">
                                    <Card.Header className="py-1 px-3" style={{
                                      fontFamily: 'NanumSquare',
                                      fontSize: '13pt'
                                    }}>
                                      <FontAwesomeIcon icon={faHashtag} className="mr-2 my-auto" size="sm" />
                                      {this.state.newChannel?.name || this.state.channels?.find(one => one.id === this.state.data?.channel)?.name}
                                    </Card.Header>
                                  </Card>
                                </>
                                : <Form.Label as="h5">선택된 채널이 없습니다!</Form.Label>
                            }

                          </Row>
                          <Row className="pb-2">
                            <input hidden={true} />
                            <Form.Control type="text" placeholder="채널 검색" onChange={(e) => this.setState({ channelSearch: e.target.value })} />
                            <Form.Text className="py-1">
                              {this.state.channels
                                ?.filter(one => one.type === "text")
                                .filter(one => one.name?.includes(this.state.channelSearch))
                                .sort((a, b) => Number(a.position) - Number(b.position)).length}개 채널 찾음
                            </Form.Text>
                          </Row>
                          <Row style={{
                            maxHeight: 220,
                            overflow: 'auto',
                            borderRadius: '10px',
                            display: 'block'
                          }}>
                            {
                              this.state.channels
                                ? this.state.channels
                                  .filter(one => one.type === "text")
                                  .filter(one => one.name?.includes(this.state.channelSearch))
                                  .sort((a, b) => Number(a.position) - Number(b.position))
                                  .map((one, idx) =>
                                    <Card bg="dark" className="mr-2" onClick={() => { this.setState({ newChannel: one }) }} style={{
                                      cursor: 'pointer',
                                      marginBottom: 5
                                    }}>
                                      <Card.Body className="d-flex justify-content-between py-1 my-0 pr-2">
                                        <div className="d-flex">
                                          <FontAwesomeIcon icon={faHashtag} className="mr-2 my-auto" size="sm" />
                                          <div style={{
                                            fontSize: '13pt'
                                          }}>
                                            {one.name}
                                          </div>
                                          <div className="ml-2 small" style={{
                                            color: 'gray'
                                          }}>
                                            {this.state.channels?.find(c => c.id === one.parentID)?.name}
                                          </div>
                                        </div>

                                        {
                                          this.state.newChannel === one
                                            ? checkMark
                                            : (!this.state.newChannel && one.id === this.state.data?.channel) && checkMark
                                        }
                                      </Card.Body>
                                    </Card>
                                  )

                                : <h4>불러오는 중</h4>
                            }
                          </Row>

                        </Container>
                      </Form.Group>
                      : <Alert variant="warning" className="d-flex">
                        <FontAwesomeIcon icon={faExclamationTriangle} color="darkorange" size="lg" className="my-auto mr-2" />
                      채널을 선택하려면 먼저 반기는 메시지 또는 보내는 메시지를 사용해야 합니다.
                  </Alert>
                  }
                </Col>
              </Row>


            </Form>
          </Col>
        </Row>

        <Row className="mt-4">
          <Button
            variant="aztra"
            disabled={this.state.saving}
            type="submit"
            onClick={() => this.setState({ saving: true })}
            style={{
              minWidth: 120
            }}
          >
            {
              this.state.saving
                ? <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="pl-2">저장 중...</span>
                </>
                : <span>저장하기</span>
            }
          </Button>
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