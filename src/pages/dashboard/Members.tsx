import React, { createRef, PureComponent } from 'react';
import axios from 'axios'
import api from '../../datas/api'
import { MemberMinimal } from '../../types/DiscordTypes';
import { Row, Col, Form, Container, Spinner } from 'react-bootstrap';
import MemberListCard from '../../components/forms/MemberListCard';

type MemberSearchType = 'nick-and-tag' | 'id'

interface MembersProps {
  readonly guildId?: string
}

interface MembersState {
  members: MemberMinimal[] | null
  memberSearch: string
  memberSearchType: MemberSearchType
  fetchDone: boolean
}

export default class Members extends PureComponent<MembersProps, MembersState> {
  state: MembersState = {
    members: null,
    memberSearch: '',
    memberSearchType: 'nick-and-tag',
    fetchDone: false
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.getMembers(token)
    }
    else {
      window.location.assign('/login')
    }
  }

  getMembers = async (token: string) => {
    try {
      let res = await axios.get(`${api}/discord/guilds/${this.props.guildId}/members`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
    var x = this.state.members
      ?.filter(one => {
        if (!search) return true
        let searchLowercase = search.normalize().toLowerCase()

        switch (this.state.memberSearchType) {
          case 'nick-and-tag':
            return one.user.tag?.normalize().toLowerCase().includes(searchLowercase) || one.nickname?.normalize().toLowerCase().includes(searchLowercase)
          case 'id':
            return one.user.id.includes(search)
        }
      })
      .sort((a, b) => {
        let aDname = a.displayName!
        let bDname = b.displayName!
        if (aDname > bDname) return 1
        else if (aDname < bDname) return -1
        return 0
      })!
    return x
  }

  handleSearchOnChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    await this.setState({ memberSearch: e.target.value })
  }

  handleMemberSearchTypeOnChange = (searchType: MemberSearchType) => {
    this.setState({ memberSearchType: searchType })
    if (this.searchRef.current) {
      this.searchRef.current.value = ''
      this.setState({ memberSearch: '' })
    }
  }

  searchRef = createRef<HTMLInputElement>()

  render() {
    const members = (
      (this.filterMembers(this.state.memberSearch) || this.state.members)?.map(one => <MemberListCard key={one.user.id} member={one} guildId={this.props.guildId!} />)
    )

    return (
      <div style={{
        fontFamily: 'NanumBarunGothic'
      }}>
        <Row className="dashboard-section">
          <h3>멤버 목록</h3>
        </Row>
        <Row>
          <Col>
            {
              this.state.fetchDone
                ? <Form>
                  <Form.Group>
                    <Row className="pb-2 justify-content-between">
                      <Col
                        className="d-flex align-items-end mt-4 mt-xl-0 px-0"
                        xs={{
                          span: 0,
                          order: "last"
                        }}
                        xl={{
                          order: "first"
                        }}
                        style={{
                          fontSize: '12pt'
                        }}>
                        멤버 전체 {this.state.members?.length} 명{this.state.memberSearch && `, ${members.length}명 검색됨`}
                      </Col>
                      <Col
                        className="px-0"
                        xs={{
                          span: "auto",
                          order: "first"
                        }}
                        xl={{
                          span: "auto",
                          order: "last"
                        }}>
                        <div className="d-flex">
                          <span>검색 조건:</span>
                          <div className="d-lg-flex">
                            <Form.Check
                              className="ml-4"
                              type="radio"
                              label="이름 및 닉네임"
                              checked={this.state.memberSearchType === 'nick-and-tag'}
                              style={{ wordBreak: 'keep-all' }}
                              onChange={() => this.handleMemberSearchTypeOnChange('nick-and-tag')}
                            />
                            <Form.Check
                              className="ml-4"
                              type="radio"
                              label="사용자 ID"
                              checked={this.state.memberSearchType === 'id'}
                              style={{ wordBreak: 'keep-all' }}
                              onChange={() => this.handleMemberSearchTypeOnChange('id')}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <input hidden={true} />
                      <Form.Control ref={this.searchRef} type="text" placeholder="멤버 검색" onChange={this.handleSearchOnChange} />
                    </Row>

                    <Row className="flex-column">
                      {members}
                    </Row>
                  </Form.Group>
                </Form>
                : <Container className="d-flex align-items-center justify-content-center flex-column" style={{
                  height: '500px'
                }}>
                  <h3 className="pb-4 text-center">멤버 목록을 가져오고 있습니다...</h3>
                  <Spinner animation="border" variant="aztra" />
                </Container>
            }
          </Col>
        </Row>
      </div>
    )
  }
}