import React, { Component } from 'react';

import axios from 'axios'
import api from '../../datas/api'
import { MemberExtended, PartialGuild } from '../../types/DiscordTypes';
import { match } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

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
    return (
      <Row className="dashboard-section">
        <Col className="col-auto">
          <Card className="flex-md-row my-3 shadow" bg="dark">
            <Card.Body className="text-center text-md-left">
              <Card.Img src={`https://cdn.discordapp.com/avatars/${this.state.member?.user.id}/${this.state.member?.user.avatar}.jpeg`} style={{
                maxWidth: 200,
                maxHeight: 200
              }} />
            </Card.Body>
            <Card.Body className="pl-md-0 pr-md-5" style={{

            }}>
              <Card.Title className="font-weight-bold text-center text-md-left" style={{
                fontFamily: 'NanumSquare'
              }}>
                {this.state.member?.user.tag}
              </Card.Title>
              <Card.Text as="div" className="lines">
                <p>
                  전체 멤버 수: x
          </p>
                <p>
                  온라인 멤버 수: y
          </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }
}