import React, { Component } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap'
import TextareaAutosize from 'react-textarea-autosize'
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
}

export default class Greeting extends Component<GreetingProps, GreetingState> {
  state: GreetingState = {
    data: null,
    fetchDone: false
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
    }
    else {
      window.location.assign('/login')
    }
  }

  render() {
    return (
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
                <Form.Check type="checkbox" label="반기는 메시지 사용" defaultChecked={!!this.state.data?.join_title_format || !!this.state.data?.join_desc_format} />
              </Form.Group>

              <Form.Group controlId="incomingTitle">
                <Form.Label>메시지 제목</Form.Label>
                <Form.Control as={TextareaAutosize} type="text" placeholder="예) {user}님, 안녕하세요!" />
              </Form.Group>

              <Form.Group controlId="incomingDesc">
                <Form.Label>메시지 내용</Form.Label>
                <Form.Control as={TextareaAutosize} type="text" placeholder="예) {guild}에 오신 것을 환영합니다." />
              </Form.Group>

              <Row className="pt-4 pb-2">
                <h4>보내는 메시지</h4>
              </Row>

              <Form.Group controlId="outgoingUse">
                <Form.Check type="checkbox" label="보내는 메시지 사용" />
              </Form.Group>

              <Form.Group controlId="outgoingTitle">
                <Form.Label>메시지 제목</Form.Label>
                <Form.Control as={TextareaAutosize} type="text" placeholder="예) {user}님, 안녕히가세요" />
              </Form.Group>

              <Form.Group controlId="outgoingDesc">
                <Form.Label>메시지 내용</Form.Label>
                <Form.Control onChange={() => console.log('dsds')} as={TextareaAutosize} type="text" placeholder="예) {user}님이 나갔습니다." />
              </Form.Group>

              <Button variant="outline-success" type="submit">
                저장하기
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}