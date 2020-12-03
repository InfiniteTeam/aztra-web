import React, { Component, createRef, RefObject } from 'react';
import { Button, Row, Col, Form, Spinner, Container, Card, Alert } from 'react-bootstrap'
import TextareaAutosize from 'react-textarea-autosize'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

import { Greetings as GreetingsType } from '../../types/dbtypes/greetings'
import api from '../../datas/api'
import { GuildChannel } from 'discord.js';

interface GreetingProps {
  readonly guildId?: string
}

interface GreetingState {
  data: GreetingsType | null
  fetchDone: boolean
  useJoin: boolean
  useLeave: boolean
  saving: boolean
  channels: GuildChannel[] | null
  channelFetchDone: boolean
  channelSearch: string
  newChannel: GuildChannel | null
  filteredChannels: GuildChannel[] | null

  validation_incomingTitle: boolean | null
  validation_incomingDesc: boolean | null
  validation_outgoingTitle: boolean | null
  validation_outgoingDesc: boolean | null
  validation_channel: boolean | null

  saveError: boolean
}

type handleFieldChangeTypes = 'incomingTitle' | 'incomingDesc' | 'outgoingTitle' | 'outgoingDesc' | 'channel'

export default class Greetings extends Component<GreetingProps, GreetingState> {
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

    validation_incomingTitle: null,
    validation_incomingDesc: null,
    validation_outgoingTitle: null,
    validation_outgoingDesc: null,
    validation_channel: null,

    saveError: false
  }

  refIncomingTitleControl: RefObject<HTMLTextAreaElement> = createRef()
  refIncomingDescControl: RefObject<HTMLTextAreaElement> = createRef()
  refOutgoingTitleControl: RefObject<HTMLTextAreaElement> = createRef()
  refOutgoingDescControl: RefObject<HTMLTextAreaElement> = createRef()

  getData = async (token: string) => {
    try {
      let res = await axios.get(`${api}/servers/${this.props.guildId}/greetings`, {
        headers: {
          token: token
        }
      })
      this.setState({ data: res.data })
      const useJoin = res.data.join_title_format || res.data.join_desc_format
      const useLeave = res.data.leave_title_format || res.data.leave_desc_format
      this.setState({
        useJoin: !!useJoin,
        useLeave: !!useLeave
      })
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
      let res = await axios.get(`${api}/discord/guilds/${this.props.guildId}/channels`, {
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

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.getData(token)
      this.getChannels(token)
      console.log(this.state.data)
    }
    else {
      window.location.assign('/login')
    }
  }

  handleFieldChange = async (type?: handleFieldChangeTypes) => {
    let value
    let s = this.state

    switch (type) {
      case 'incomingTitle':
        value = this.refIncomingTitleControl.current?.value!
        await this.setState({ validation_incomingTitle: 0 < value.length && value.length <= 256 ? null : s.useJoin ? false : null })
        break
      case 'outgoingTitle':
        value = this.refOutgoingTitleControl.current?.value!
        await this.setState({ validation_outgoingTitle: 0 < value.length && value.length <= 256 ? null : s.useLeave ? false : null })
        break
      case 'incomingDesc':
        value = this.refIncomingDescControl.current?.value!
        await this.setState({ validation_incomingDesc: 0 < value.length && value.length <= 2048 ? null : s.useJoin ? false : null })
        break
      case 'outgoingDesc':
        value = this.refOutgoingDescControl.current?.value!
        await this.setState({ validation_outgoingDesc: 0 < value.length && value.length <= 2048 ? null : s.useLeave ? false : null })
        break
      case 'channel':
        console.log('dd')
        await this.setState({ validation_channel: this.state.useJoin || this.state.useLeave ? (!!this.state.data?.channel || !!this.state.newChannel ? null : false) : null })
        break
      default:
        for (let x of ['incomingTitle', 'incomingDesc', 'outgoingTitle', 'outgoingDesc', 'channel']) {
          this.handleFieldChange(x as handleFieldChangeTypes)
        }
    }
  }

  checkValidate = () => {
    let s = this.state

    console.log(s)
    return (
      s.validation_incomingTitle === null
      && s.validation_incomingDesc === null
      && s.validation_outgoingTitle === null
      && s.validation_outgoingDesc === null
      && s.validation_channel === null
    )
  }

  save = async () => {
    this.setState({ saving: true })
    let data: GreetingsType = {
      guild: this.state.data?.guild!,
      channel: this.state.newChannel?.id! || this.state.data?.channel!,
      join_title_format: this.refIncomingTitleControl.current?.value!,
      join_desc_format: this.refIncomingDescControl.current?.value!,
      leave_title_format: this.refOutgoingTitleControl.current?.value!,
      leave_desc_format: this.refOutgoingDescControl.current?.value!
    }
    try {
      await axios.post(`${api}/servers/${this.props.guildId}/greetings`, data, {
        headers: {
          token: localStorage.getItem('token')
        },
      })
    }
    catch (e) {
      this.setState({ saveError: true })
    }
    finally {
      this.setState({ saving: false })
    }
  }

  handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    this.handleFieldChange()
      .then(() => {
        console.log(this.checkValidate())
        if (this.checkValidate()) {
          this.save()
        }
      })
  }

  render() {
    const checkMark = <FontAwesomeIcon icon={faCheckCircle} className="mr-2 my-auto text-success" size="lg" />

    return this.state.fetchDone ? (
      <div>
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
                  <Form.Control ref={this.refIncomingTitleControl as unknown as RefObject<TextareaAutosize>} className="shadow" isInvalid={this.state.validation_incomingTitle === false} as={TextareaAutosize} type="text" placeholder="예) {user}님, 안녕하세요!" defaultValue={this.state.data?.join_title_format || undefined} onChange={() => { this.handleFieldChange('incomingTitle') }} />
                  <Form.Control.Feedback type="invalid">빈칸일 수 없으며 최대 256자를 초과할 수 없습니다!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="incomingDesc">
                  <Form.Label>메시지 내용</Form.Label>
                  <Form.Control ref={this.refIncomingDescControl as unknown as RefObject<TextareaAutosize>} className="shadow" isInvalid={this.state.validation_incomingDesc === false} as={TextareaAutosize} type="text" placeholder="예) {guild}에 오신 것을 환영합니다." defaultValue={this.state.data?.join_desc_format || undefined} onChange={() => { this.handleFieldChange('incomingDesc') }} />
                  <Form.Control.Feedback type="invalid">빈칸일 수 없으며 최대 2048자를 초과할 수 없습니다!</Form.Control.Feedback>
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
                  <Form.Control ref={this.refOutgoingTitleControl as unknown as RefObject<TextareaAutosize>} className="shadow" isInvalid={this.state.validation_outgoingTitle === false} as={TextareaAutosize} type="text" placeholder="예) {user}님, 안녕히가세요" defaultValue={this.state.data?.leave_title_format || undefined} onChange={() => { this.handleFieldChange('outgoingTitle') }} />
                  <Form.Control.Feedback type="invalid">빈칸일 수 없으며 최대 256자를 초과할 수 없습니다!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="outgoingDesc">
                  <Form.Label>메시지 내용</Form.Label>
                  <Form.Control ref={this.refOutgoingDescControl as unknown as RefObject<TextareaAutosize>} className="shadow" isInvalid={this.state.validation_outgoingDesc === false} as={TextareaAutosize} type="text" placeholder="예) {user}님이 나갔습니다." defaultValue={this.state.data?.leave_desc_format || undefined} onChange={() => { this.handleFieldChange('outgoingDesc') }} />
                  <Form.Control.Feedback type="invalid">빈칸일 수 없으며 최대 2048자를 초과할 수 없습니다!</Form.Control.Feedback>
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
                                : <Form.Label as="h5" className={this.state.validation_channel === false ? "text-danger font-weight-bold" : ""}>선택된 채널이 없습니다!</Form.Label>
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

              <Row className="mt-4">
                <Button
                  variant={this.state.saveError ? "danger" : "aztra"}
                  disabled={this.state.saving || this.state.saveError}
                  type="button"
                  onClick={this.handleSubmit}
                  style={{
                    minWidth: 120
                  }}
                >
                  {
                    this.state.saving
                      ? <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="pl-2">저장 중...</span>
                      </>
                      : <span>{this.state.saveError ? "오류" : "저장하기"}</span>
                  }
                </Button>
              </Row>
            </Form>
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