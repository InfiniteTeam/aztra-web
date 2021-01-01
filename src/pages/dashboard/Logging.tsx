import React, { Component } from 'react'
import { Col, Form, FormCheckProps, Row } from 'react-bootstrap'

interface LoggingOptionCheckboxProps extends FormCheckProps {
  label?: string
}

const LoggingOptionCheckbox: React.FC<Omit<LoggingOptionCheckboxProps, 'custom' | 'type'>> = (props) => {
  return <Form.Check {...props} custom type="checkbox" label={<div className="pl-2" style={{ fontSize: '11pt' }}>{props.label}</div>} />
}

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
                  <Row>
                    <Col>
                      <h4 className="pb-2">
                        메시지 로깅
                      </h4>
                      <Form.Group>
                        <LoggingOptionCheckbox id="logging-message-deleted" className="pb-1" label="메시지가 삭제되었을 때" />
                        <LoggingOptionCheckbox id="logging-message-edited" className="pb-1" label="메시지가 수정되었을 때" />
                        <LoggingOptionCheckbox id="logging-message-pinned-or-unpinned" className="pb-1" label="메시지가 고정 또는 고정 해제되었을 때" />
                      </Form.Group>
                      <Form.Group>
                        <LoggingOptionCheckbox id="logging-reaction-removed" className="pb-1" label="반응이 제거되었을 때" />
                        <LoggingOptionCheckbox id="logging-reaction-cleared" className="pb-1" label="모든 반응이 제거되었을 때" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <h4 className="pb-2">
                        채널 로깅
                      </h4>
                      <Form.Group>
                        <LoggingOptionCheckbox id="logging-guild-channel-created" className="pb-1" label="채널이 생성되었을 때" />
                        <LoggingOptionCheckbox id="logging-guild-channel-deleted" className="pb-1" label="채널이 삭제되었을 때" />
                        <LoggingOptionCheckbox id="logging-guild-channel-edited" className="pb-1" label="채널이 수정되었을 때" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <h4 className="pb-2">
                        멤버 로깅
                      </h4>
                      <Form.Group>
                        <LoggingOptionCheckbox id="logging-member-joined" className="pb-1" label="멤버가 참여했을 때" />
                        <LoggingOptionCheckbox id="logging-member-left" className="pb-1" label="멤버가 나갔을 때" />
                        <LoggingOptionCheckbox id="logging-member-edited" className="pb-1" label="멤버가 수정되었을 때" />
                      </Form.Group>
                      <Form.Group>
                        <LoggingOptionCheckbox id="logging-member-banned" className="pb-1" label="멤버가 차단되었을 때" />
                        <LoggingOptionCheckbox id="logging-member-unbanned" className="pb-1" label="멤버의 차단이 해제되었을 때" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <h4 className="pb-2">
                        서버 로깅
                      </h4>
                      <Form.Group>
                        <LoggingOptionCheckbox id="logging-guild-updated" className="pb-1" label="서버 설정이 변경되었을 때" />
                        <LoggingOptionCheckbox id="logging-guild-role-created" className="pb-1" label="역할이 생성되었을 때" />
                        <LoggingOptionCheckbox id="logging-guild-role-deleted" className="pb-1" label="역할이 삭제되었을 때" />
                        <LoggingOptionCheckbox id="logging-guild-role-edited" className="pb-1" label="역할이 수정되었을 때" />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              }
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}