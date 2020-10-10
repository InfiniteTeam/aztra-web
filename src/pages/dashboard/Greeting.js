import React, { Component } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap'
import TextareaAutosize from 'react-textarea-autosize'

export default class Greeting extends Component {
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
                <Form.Check type="checkbox" label="반기는 메시지 사용" />
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