import React, { Component } from 'react';

import axios from 'axios'
import api from '../../datas/api'
import { MemberExtended, PartialGuild } from '../../types/DiscordTypes';
import { match } from 'react-router-dom';
import { Row, Col, Card, Container, Spinner, Badge, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl } from '@fortawesome/free-solid-svg-icons'

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
    var statusColor: string | null = null

    switch (this.state.member?.user.presence.status) {
      case 'online':
        statusColor = 'limegreen'
        break
      case 'dnd':
        statusColor = 'red'
        break
      case 'idle':
        statusColor = 'gold'
        break
      case 'offline':
      case 'invisible':
        statusColor = 'darkgrey'
        break
      default:
        break
    }

    return this.state.fetchDone
      ? (
        <>
          <Row className="dashboard-section justify-content-between">
            <h3>멤버 정보</h3>
            <div>
              <Button variant="aztra" size="sm" href={`/dashboard/${this.props.guild?.id}/members`}>
                <FontAwesomeIcon icon={faListUl} className="mr-2" />목록으로
              </Button>
            </div>
          </Row>

          <Row className="justify-content-center justify-content-sm-start">
            <div className="position-relative">
              <div style={{
                width: 128,
                height: 128
              }}>
                <img className="rounded-circle" src={`https://cdn.discordapp.com/avatars/${this.state.member?.user.id}/${this.state.member?.user.avatar}.jpeg?size=128`} />
              </div>
              {statusColor && <div style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: statusColor,
                position: 'absolute',
                bottom: 1,
                right: 1,
                border: '7px solid #252a2e',
                backgroundClip: 'border-box'
              }} />}
            </div>
            <div className="text-center text-sm-left mt-4 mt-sm-0 px-4">
              <div style={{
                fontSize: '24pt'
              }}>
                {this.state.member?.displayName}
                {
                  this.state.member?.user.bot &&
                  <Badge variant="blurple" className="ml-2 font-weight-bold mt-2 align-text-top" style={{
                    fontSize: '11pt'
                  }}>
                    BOT
                  </Badge>
                }
              </div>
              <div style={{
                fontSize: '17pt'
              }}>
                {this.state.member?.user.username}
                <span className="ml-1 font-weight-bold" style={{
                  color: '#8f8f8f',
                  fontSize: '13pt'
                }}>
                  #{this.state.member?.user.discriminator}
                </span>
              </div>
            </div>
          </Row>

          <Row className="dashboard-section mt-5">
            <Col>
              <h4>최근 활동</h4>
            </Col>
          </Row>
        </>
      )
      : <Container className="d-flex align-items-center justify-content-center flex-column" style={{
        height: '500px'
      }}>
        <h3 className="pb-4">불러오는 중</h3>
        <Spinner animation="border" variant="aztra" />
      </Container>
  }
}