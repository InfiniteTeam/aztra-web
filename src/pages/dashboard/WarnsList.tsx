import React, { PureComponent } from 'react';

import axios from 'axios'
import api from '../../datas/api'
import { Warns as WarnsType } from '../../types/dbtypes/warns';
import { Row, Col, Form, Container, Spinner, Button, Table } from 'react-bootstrap';
import MemberListCard from '../../components/forms/MemberListCard';
import { MemberMinimal } from '../../types/DiscordTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


interface WarnsListProps {
  readonly guildId?: string
}

interface WarnsListState {
  members: MemberMinimal[] | null
  memberSearch: string
  membersFetchDone: boolean

  warns: WarnsType[] | null
  warnsFetchDone: boolean
}

export default class Members extends PureComponent<WarnsListProps, WarnsListState> {
  state: WarnsListState = {
    members: null,
    memberSearch: '',
    membersFetchDone: false,
    warns: null,
    warnsFetchDone: false
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.getMembers(token)
      this.getWarns(token)
    }
    else {
      window.location.assign('/login')
    }
  }

  getWarns = async (token: string) => {
    try {
      let res = await axios.get(`${api}/servers/${this.props.guildId}/warns`, {
        headers: {
          token: token
        }
      })
      this.setState({ warns: res.data })
    }
    catch (e) {
      this.setState({ warns: null })
    }
    finally {
      this.setState({ warnsFetchDone: true })
    }
  }

  getMembers = async (token: string) => {
    try {
      let res = await axios.get(`${api}/discord/guilds/${this.props.guildId}/members`, {
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
      this.setState({ membersFetchDone: true })
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
    const warns = (
      (this.filterMembers(this.state.memberSearch) || this.state.members)?.map(one => <MemberListCard key={one.user.id} member={one} guildId={this.props.guildId!} />)
    )

    return (
      <div style={{
        fontFamily: 'NanumBarunGothic'
      }}>
        <Row className="dashboard-section">
          <div>
            <a className="d-flex align-items-center pl-2" href={`/dashboard/${this.props.guildId}/warns`}>
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
              [경고 관리] 로 돌아가기
            </a>
            <h3 className="mt-4">전체 경고 목록</h3>
          </div>
        </Row>
        <Row>
          <Col>
            {
              this.state.membersFetchDone && this.state.warnsFetchDone
                ? <Form>
                  <Form.Group>
                    <Row className="pb-2">
                      <Form.Text style={{

                        paddingBottom: '8px',
                        fontSize: '12pt'
                      }}>
                        전체 경고 {this.state.members?.length} 건{this.state.memberSearch && `, ${[].length}건 검색됨`}
                      </Form.Text>
                      <input hidden={true} />
                      <Form.Control type="text" placeholder="경고 검색" onChange={this.handleSearchOnChange} />
                    </Row>
                    <Row className="flex-column">
                      <Table striped bordered hover variant="dark">
                        <thead>
                          <tr>
                            <th>대상 멤버</th>
                            <th>경고 사유</th>
                            <th>경고 횟수</th>
                            <th>경고를 부여한 사람</th>
                          </tr>
                        </thead>
                      </Table>
                    </Row>
                  </Form.Group>
                </Form>
                : <Container className="d-flex align-items-center justify-content-center flex-column" style={{
                  height: '500px'
                }}>
                  <h3 className="pb-4 text-center">경고 목록을 가져오고 있습니다...</h3>
                  <Spinner animation="border" variant="aztra" />
                </Container>
            }
          </Col>
        </Row>
      </div>
    )
  }
}