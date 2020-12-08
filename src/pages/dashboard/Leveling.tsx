import { Switch } from '@material-ui/core'
import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

interface LevelingProps {
  guildId?: string
}

interface LevelingState {
  useLevelupMessage: boolean
}


export default class Leveling extends React.Component<LevelingProps, LevelingState> {
  state: LevelingState = {
    useLevelupMessage: false
  }

  render() {
    return (
      <div>
        <Row className="dashboard-section">
          <div>
            <h3>레벨링 설정</h3>
            <div className="py-2">
              멤버가 메시지를 보낼 때 마다 경험치를 얻고, 레벨을 올릴 수 있습니다.
            </div>
          </div>
        </Row>
        <Row>
          <Col>
            <Form noValidate>
              <Row className="pb-2">
                <h4>레벨 메시지 설정</h4>
              </Row>

              <Switch color="primary" />
              <Form.Group controlId="incomingUse">
                <Form.Check
                  type="switch"
                  label={
                    <div className="pl-2">
                      멤버의 레벨이 올랐을 떄 메시지 보내기
                    </div>
                  }
                  checked={this.state.useLevelupMessage}
                  onClick={() => this.setState({ useLevelupMessage: !this.state.useLevelupMessage })}
                  aria-controls="incomingForm"
                  aria-expanded={!!this.state.useLevelupMessage}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}