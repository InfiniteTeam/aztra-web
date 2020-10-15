import React, { Component } from 'react';
import { Button, Row, Col, Form, Spinner, Container, Card } from 'react-bootstrap'
import TextareaAutosize from 'react-textarea-autosize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

import { PartialGuild } from '../../types/DiscordTypes'

import axios from 'axios'

import { Greetings } from '../../types/dbtypes/greetings'
import api from '../../datas/api'

interface GreetingProps {
  readonly guild: PartialGuild | null
}

interface GreetingState {
  data: Greetings | null
  fetchDone: boolean
  useJoin: boolean
  useLeave: boolean
  saving: boolean
}

export default class Greeting extends Component<GreetingProps, GreetingState> {
  state: GreetingState = {
    data: null,
    fetchDone: false,
    useJoin: false,
    useLeave: false,
    saving: false
  }

  getData = async (token: string) => {
    try {
      console.log('dsds')
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

  async componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      await this.getData(token)
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

  render() {
    console.log(this.state.useJoin)
    return this.state.fetchDone ? (
      <div style={{
        fontFamily: 'NanumBarunGothic'
      }}>
        <Row className="dashboard-section">
          <h3>환영 메시지 설정</h3>
        </Row>
        <Row>
          <Col>
            <Form>
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
                  <Form.Control as={TextareaAutosize} type="text" placeholder="예) {user}님, 안녕하세요!" defaultValue={this.state.data?.join_title_format || undefined} />
                </Form.Group>

                <Form.Group controlId="incomingDesc">
                  <Form.Label>메시지 내용</Form.Label>
                  <Form.Control as={TextareaAutosize} type="text" placeholder="예) {guild}에 오신 것을 환영합니다." defaultValue={this.state.data?.join_desc_format || undefined} />
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
                  <Form.Control as={TextareaAutosize} type="text" placeholder="예) {user}님, 안녕히가세요" defaultValue={this.state.data?.leave_title_format || undefined} />
                </Form.Group>

                <Form.Group controlId="outgoingDesc">
                  <Form.Label>메시지 내용</Form.Label>
                  <Form.Control onChange={() => console.log('dsds')} as={TextareaAutosize} type="text" placeholder="예) {user}님이 나갔습니다." defaultValue={this.state.data?.leave_desc_format || undefined} />
                </Form.Group>
              </div>

              <Row className="pt-4 pb-2">
                <h4 className="pr-5">전송 채널</h4>
              </Row>
              <Form.Group>
                <Container fluid style={{
                  maxHeight: 220,
                  overflow: 'auto',

                  borderRadius: '10px',
                  paddingTop: 10
                }}>
                  {["잡담", "공지", "회의", "아이디어", "자료실", "투표"].map((one, idx) =>
                    <Card bg="dark" className="mb-1">
                      <Card.Body className="d-flex justify-content-between py-1 my-0 pr-2">
                        <div className="d-flex">
                          <FontAwesomeIcon icon={faHashtag} className="mr-2 my-auto" size="sm" />
                          <div style={{
                            fontSize: '13pt'
                          }}>
                            {one}
                          </div>
                          <div className="ml-2 small" style={{
                            color: 'lightgray'
                          }}>
                            자유
                          </div>
                        </div>

                        {idx === 1 && <FontAwesomeIcon icon={faCheckCircle} className="mr-2 my-auto text-success" size="lg" />}
                      </Card.Body>
                    </Card>
                  )}
                </Container>
              </Form.Group>

            </Form>
          </Col>
        </Row>

        <Row className="mt-4">
          <Button variant={this.state.saving ? "success" : "outline-success"} disabled={this.state.saving} type="submit" onClick={() => this.setState({ saving: true })}>
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