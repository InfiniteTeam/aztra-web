import React, { Component } from 'react';

import axios from 'axios'
import api from '../../datas/api'
import { MemberMinimal, PartialGuild } from '../../types/DiscordTypes';
import Row from 'react-bootstrap/esm/Row';
import { Col, Form } from 'react-bootstrap';
import MemberListCard from '../../components/forms/MemberListCard';

interface MembersProps {
  readonly guild: PartialGuild | null
}

interface MembersState {
  members: MemberMinimal[] | null
  memberSearch: string
  fetchDone: boolean
  filteredMembers: MemberMinimal[] | null,
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
        !e || one.user.username?.toLowerCase()?.includes(e.target.value.toLowerCase()) || one.nickname?.toLowerCase()?.includes(e.target.value.toLowerCase())
      )?.sort((a, b) => {
        let aDname = a.displayName!
        let bDname = b.displayName!
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
      (this.state.filteredMembers || this.state.members)?.map((one, idx) => {
        return <MemberListCard key={idx} member={one} />
      })
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
            {
              this.state.fetchDone
                ? <Form>
                  <Form.Group>
                    <Row className="pb-2">
                      <Form.Text style={{

                        paddingBottom: '8px',
                        fontSize: '12pt'
                      }}>
                        멤버 {this.state.members?.length} 명
                      </Form.Text>
                      <input hidden={true} />
                      <Form.Control type="text" placeholder="멤버 검색" onChange={this.filterMembers} />
                    </Row>
                    <Row className="flex-column">
                      {members}
                    </Row>
                  </Form.Group>
                </Form>
                : <h4>멤버 목록을 불러오는 중...</h4>
            }
          </Col>
        </Row>
      </div>
    )
  }
}