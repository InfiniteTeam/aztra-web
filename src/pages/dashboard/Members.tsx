import React, { Component } from 'react';
import { GuildMember } from 'discord.js'

import axios from 'axios'
import api from '../../datas/api'
import { PartialGuild } from '../../types/DiscordTypes';
import Row from 'react-bootstrap/esm/Row';
import { Badge, Card, Col, Form } from 'react-bootstrap';

interface MembersProps {
  readonly guild: PartialGuild | null
}

interface MembersState {
  members: GuildMember[] | null
  memberSearch: string
  fetchDone: boolean
  filteredMembers: GuildMember[] | null
}

export default class Members extends Component<MembersProps, MembersState> {
  state: MembersState = {
    members: null,
    memberSearch: '',
    fetchDone: false,
    filteredMembers: null
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
      this.filterMembers()
    }
    catch (e) {
      this.setState({ members: null })
    }
    finally {
      this.setState({ fetchDone: true })
    }
  }

  filterMembers = (e?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    this.setState({
      filteredMembers: this.state.members?.filter(one =>
        !e || one.user.username.toLowerCase().includes(e.target.value.toLowerCase()) || one.nickname?.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      )?.sort((a, b) => {
        let aDname = a.nickname || a.user.username
        let bDname = b.nickname || b.user.username
        if (aDname > bDname) return 1
        else if (aDname < bDname) return -1
        return 0
      }
      )!
    })
  }

  render() {
    console.log('dsds')
    const members = (
      (this.state.filteredMembers || this.state.members)?.map(one =>
        <Card bg="dark" className="mb-2">
          <Card.Header className="d-flex py-1">
            <img className="my-auto" alt={one.user.tag} src={one.user.avatar ? `https://cdn.discordapp.com/avatars/${one.user.id}/${one.user.avatar}.png` : one.user.defaultAvatarURL} style={{ maxHeight: 40, marginRight: 15, borderRadius: '70%' }} />
            <div>
              <div className="d-flex">
                <div>
                  {one.nickname || one.user.username}
                </div>
                <h6>
                  {one.user.bot && <Badge className="ml-2 my-auto" variant="blurple">BOT</Badge>}
                </h6>
              </div>
              <div className="text-muted font-weight-bold" style={{
                fontSize: '11pt'
              }}>
                @{one.user.tag}
              </div>
            </div>
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
            {this.state.fetchDone ? <Form>
              <Form.Group>
                <Row className="pb-2">
                  <input hidden={true} />
                  <Form.Control type="text" placeholder="멤버 검색" onChange={this.filterMembers} />
                </Row>
                <Row className="flex-column">
                  {members}
                </Row>
              </Form.Group>
            </Form> : <h4>멤버 목록을 불러오는 중...</h4>}
          </Col>
        </Row>
      </div>
    )
  }
}