import React, { Component } from 'react';

import axios from 'axios'
import api from '../../datas/api'
import { MemberExtended, PartialGuild } from '../../types/DiscordTypes';
import { match } from 'react-router-dom';
import { Row, Col, Card, Container, Spinner, Badge } from 'react-bootstrap';

interface MatchParams {
  readonly userid: string
  readonly serverid: string
}

interface Match extends match {
  readonly params: MatchParams
}

interface MemberDashboardProps {
  readonly match: Match
  readonly guild: PartialGuild | null
}

interface MemberDashboardState {
  member: MemberExtended | null
  fetchDone: boolean
}

export default class MemberDashboard extends Component<MemberDashboardProps, MemberDashboardState> {
  state: MemberDashboardState = {
    member: null,
    fetchDone: false
  }

  async componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      await this.getMember(token)
    }
    else {
      window.location.assign('/login')
    }
  }

  getMember = async (token: string) => {
    try {
      let res = await axios.get(`${api}/discord/guilds/${this.props.guild?.id}/members/${this.props.match.params.userid}`, {
        headers: {
          token: token
        }
      })
      console.log(res.data)
      this.setState({ member: res.data })
    }
    catch (e) {
      this.setState({ member: null })
    }
    finally {
      this.setState({ fetchDone: true })
    }
  }

  render() {
    return this.state.fetchDone
      ? (
        <Row className="dashboard-section">
          <Col className="col-auto">
            <Card className="flex-row my-3 shadow" bg="dark">
              <Card.Body className="text-center text-md-left">
                <Card.Img src={`https://cdn.discordapp.com/avatars/${this.state.member?.user.id}/${this.state.member?.user.avatar}.jpeg`} style={{
                  maxHeight: 200
                }} />
              </Card.Body>
              <Card.Body className="pl-md-0 pr-md-5" style={{

              }}>
                <Card.Title className="font-weight-bold text-md-left" style={{
                  fontFamily: 'NanumSquare'
                }}>
                  <div>
                    {this.state.member?.user.username}
                    <span className="ml-1 font-weight-bold" style={{
                      color: '#8f8f8f',
                      fontSize: '13pt'
                    }}>
                      #{this.state.member?.user.discriminator}
                    </span>
                    {
                      this.state.member?.user.bot &&
                      <Badge variant="blurple" className="ml-2 font-weight-bold" style={{
                        fontSize: '10pt'
                      }}>
                        BOT
                      </Badge>
                    }
                  </div>
                </Card.Title>
                <Card.Text as="div" className="lines">

                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )
      : <Container className="d-flex align-items-center justify-content-center flex-column" style={{
        height: '500px'
      }}>
        <h3 className="pb-4">불러오는 중</h3>
        <Spinner animation="border" variant="aztra" />
      </Container>
  }
}