import React, { Component } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

export interface LoggingProps {
  guildId?: string
}

export interface LoggingState {
  useLogging: boolean
}

export default class Logging extends Component<LoggingProps, LoggingState> {
  state: LoggingState = {
    useLogging: false
  }

  render() {
    return (
      <div>
        <Row className="dashboard-section">
          <div>
            <h3>로깅 설정</h3>
            <div className="py-2">
              서버에서 무언가 새로 추가되거나, 변경되거나, 제거되었을 때 그 내용을 특정 채널에 전송 및 기록합니다.
            </div>
          </div>
        </Row>
        <Row>
          <Col>
            <Form noValidate>
              <Form.Group controlId="useLogging" className="pb-4">
                <Form.Check
                  type="switch"
                  label={
                    <div className="pl-2 font-weight-bold">
                      로깅 사용하기
                    </div>
                  }
                  checked={this.state.useLogging}
                  onClick={() => this.setState({ useLogging: !this.state.useLogging })}
                  aria-controls="useLogging"
                  aria-expanded={!!this.state.useLogging}
                />
              </Form.Group>
              {
                this.state.useLogging &&
                <>
                  <h4 className="pb-2">메시지 로깅 설정</h4>
                  <Container fluid>
                    <Form.Group>
                      <Form.Check id="logging-message-deleted" className="pb-2" custom type="checkbox" label="메시지가 삭제되었을 때" />
                      <Form.Check id="logging-message-edited" className="pb-2" custom type="checkbox" label="메시지가 수정되었을 때" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Check id="logging-reaction-removed" className="pb-2" custom type="checkbox" label="반응이 제거되었을 때" />
                      <Form.Check id="logging-reaction-cleared" className="pb-2" custom type="checkbox" label="모든 반응이 제거되었을 때" />
                    </Form.Group>
                  </Container>
                </>
              }
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}