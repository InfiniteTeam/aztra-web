import React, { Component } from 'react';
import { GuildMember } from 'discord.js'

import axios from 'axios'
import api from '../../datas/api'
import { PartialGuild } from '../../types/DiscordTypes';
import Row from 'react-bootstrap/esm/Row';
import { Card, Col } from 'react-bootstrap';

interface MembersProps {
  readonly guild: PartialGuild | null
}

interface MembersState {
  members: GuildMember[] | null
}

export default class Members extends Component<MembersProps, MembersState> {
  state: MembersState = {
    members: null
  }

  async componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      await this.getMembers(token)
    }
    else {
      window.location.assign('/login')
    }
  }

  getMembers = async (token: string) => {
    try {
      let res = await axios.get(`${api}/discord/guilds/${this.props.guild?.id}/members`, {
        headers: {
          token: token
        }
      })
      console.log(res.data)
      this.setState({ members: res.data })
    }
    catch (e) {
      this.setState({ members: null })
    }
  }

  render() {
    const members = (
      this.state.members?.map(one =>
        <Card bg="dark" className="mb-2">
          <Card.Header>
            <img alt="" src={`https://cdn.discordapp.com/avatars/${one.user.id}/${one.user.avatar}.png`} style={{ maxHeight: 40, marginRight: 15, borderRadius: '70%' }} />
            {one.user.username}
          </Card.Header>
        </Card>
      )
    )

    return (
      <div style={{
        fontFamily: 'NanumBarunGothic'
      }}>
        <Row className="dashboard-section">
          <h3>멤버 관리</h3>
        </Row>
        <Row>
          <Col>
            {members}
          </Col>
        </Row>
      </div>
    )
  }
}