import React, { PureComponent } from 'react';

import axios from 'axios'
import api from '../../datas/api'
import { MemberMinimal, PartialGuild } from '../../types/DiscordTypes';
import { Row, Col, Form } from 'react-bootstrap';
import MemberListCard from '../../components/forms/MemberListCard';


interface MembersProps {
  readonly guild: PartialGuild | null
}

interface MembersState {
  members: MemberMinimal[] | null
  memberSearch: string
  fetchDone: boolean
}

export default class Members extends PureComponent<MembersProps, MembersState> {
  state: MembersState = {
    members: null,
    memberSearch: '',
    fetchDone: false
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
    finally {
      this.setState({ fetchDone: true })
    }
  }

  filterMembers = (search?: string) => {
    var x = this.state.members?.filter(one =>
      !search || one.user.username?.toLowerCase()?.includes(search.toLowerCase()) || one.nickname?.toLowerCase()?.includes(search.toLowerCase())
    )?.sort((a, b) => {
      let aDname = a.displayName!
      let bDname = b.displayName!
      if (aDname > bDname) return 1
      else if (aDname < bDname) return -1
      return 0
    })!
    return x
  }

  handleSearchOnChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    console.time()
    await this.setState({ memberSearch: e.target.value })
    console.timeEnd()
  }

  render() {
    const members = (
      (this.filterMembers(this.state.memberSearch) || this.state.members)?.map(one => <MemberListCard key={one.user.id} member={one} guildId={this.props.guild?.id!} />)
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
                        멤버 전체 {this.state.members?.length} 명{this.state.memberSearch && `, ${members.length}명 검색됨`}
                      </Form.Text>
                      <input hidden={true} />
                      <Form.Control type="text" placeholder="멤버 검색" onChange={this.handleSearchOnChange} />
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