import React from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import api from '../../datas/api'

import { ServerData } from '../../types/dbtypes/serverdata'

interface LevelingProps {
  guildId?: string
}

interface LevelingState {
  data: ServerData | null
  useLevelupMessage: boolean
  fetchDone: boolean
  validation_channel: boolean | null
  saving: boolean
  saveError: boolean
}


export default class Leveling extends React.Component<LevelingProps, LevelingState> {
  state: LevelingState = {
    data: null,
    useLevelupMessage: false,
    fetchDone: false,
    validation_channel: null,
    saving: false,
    saveError: false
  }

  getData = async (token: string) => {
    try {
      let res = await axios.get(`${api}/servers/${this.props.guildId}/serverdata`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      let data: ServerData = res.data

      this.setState({ data, useLevelupMessage: data.sendLevelMessage })
    }
    catch (e) {
      this.setState({ data: null })
    }
    finally {
      this.setState({ fetchDone: true })
    }
  }

  save = async () => {
    this.setState({ saving: true })
    let data: ServerData = {
      sendLevelMessage: this.state.useLevelupMessage,
      noticeChannel: this.state.data?.noticeChannel!
    }

    try {
      await axios.post(`${api}/servers/${this.props.guildId}/serverdata`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      this.setState({ data })
    }
    catch (e) {
      this.setState({ saveError: true })
    }
    finally {
      this.setState({ saving: false })
    }
  }

  checkValidate = () => {
    let s = this.state

    return (
      s.validation_channel === null
    )
  }

  handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    if (this.checkValidate()) {
      this.save()
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.getData(token)
    }
  }

  isChanged = () => {
    if (!this.state.fetchDone) {
      return false
    }

    let data = this.state.data!
    return (
      data.sendLevelMessage !== this.state.useLevelupMessage
    )
  }

  render() {

    return this.state.fetchDone ? (
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

              <Form.Group controlId="levelingSetting">
                <Form.Check
                  type="switch"
                  label={
                    <div className="pl-2">
                      멤버의 레벨이 올랐을 때 메시지 보내기
                    </div>
                  }
                  checked={this.state.useLevelupMessage}
                  onClick={() => this.setState({ useLevelupMessage: !this.state.useLevelupMessage })}
                  aria-controls="incomingForm"
                  aria-expanded={!!this.state.useLevelupMessage}
                />
              </Form.Group>

              <Row className="mt-4">
                <Button
                  variant={this.state.saveError ? "danger" : "aztra"}
                  disabled={this.state.saving || this.state.saveError || !this.isChanged()}
                  onClick={this.handleSubmit}
                  style={{
                    minWidth: 140
                  }}
                >
                  {
                    this.state.saving
                      ? <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="pl-2">저장 중...</span>
                      </>
                      : <span>{this.state.saveError ? "오류" : this.isChanged() ? "저장하기" : "저장됨"}</span>
                  }
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    ) : <Container className="d-flex align-items-center justify-content-center flex-column" style={{
      height: '500px'
    }}>
        <h3 className="pb-4">불러오는 중</h3>
        <Spinner animation="border" variant="aztra" />
      </Container>
  }
}
