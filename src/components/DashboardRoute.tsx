import React, { Component, createRef } from 'react';
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import DashboardMain from '../pages/dashboard/Main'
import DashboardGreeting from '../pages/dashboard/Greeting'
import DashboardMembers from '../pages/dashboard/Members'
import MemberDashboard from '../pages/dashboard/MemberDashboard'

import Sidebar from './Sidebar'
import NotFound from '../pages/NotFound'
import axios from 'axios'
import urljoin from 'url-join'
import api from '../datas/api'
import { Permissions } from 'discord.js'
import { PartialGuild } from '../types/DiscordTypes'
import { match } from 'react-router-dom'

const swal = require('@sweetalert/with-react')

interface MatchParams {
  readonly serverid: string
}

interface Match extends match {
  readonly params: MatchParams
}

interface DashboardRouteProps {
  readonly match: Match
}

interface DashboardRouteState {
  guild: PartialGuild | null
  fetchDone: boolean
  sidebarOpen: boolean
  winWidth: number
  winHeight: number
}

export default class DashboardRoute extends Component<DashboardRouteProps, DashboardRouteState> {
  state: DashboardRouteState = {
    guild: null,
    fetchDone: false,
    sidebarOpen: false,
    winWidth: window.innerWidth,
    winHeight: window.innerHeight
  }

  sidebarHeaderRef: React.RefObject<HTMLDivElement> = createRef()

  getGuild = async (token: string) => {
    await axios.get(urljoin(api, '/discord/users/@me/guilds'), {
      headers: {
        token: token
      }
    })
      .then(res => {
        let guild = res.data
          .filter((one: PartialGuild) => {
            let perms = new Permissions(Number(one.permissions))
            return perms.has(Permissions.FLAGS.ADMINISTRATOR)
          })
          .find((one: PartialGuild) => one.id === this.props.match.params.serverid)
        this.setState({ guild: guild })
      })
      .catch(e => {
        this.setState({ guild: null })
        console.log(e)
      })
      .finally(() => {
        this.setState({ fetchDone: true })
      })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowState)

    const token = localStorage.getItem('token')
    if (token) {
      this.getGuild(token)
    }
    else {
      window.location.assign('/login')
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowState)
  }

  updateWindowState = () => {
    this.setState({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
    })
  }

  render() {
    const guild = this.state.guild
    // const wsSupport = 'WebSocket' in window || 'MozWebSocket' in window

    const isXXSsize = this.state.winWidth < 576

    if (this.state.fetchDone && !guild) {
      swal(
        <div>
          <h2>서버를 찾을 수 없습니다!</h2>
          <p className="px-3">
            사용자가 들어가있지 않는 서버이거나 존재하지 않는 서버입니다
          </p>
          <Button variant="danger" href="/servers">서버 목록으로</Button>
        </div>,
        {
          icon: "error",
          button: false,
          closeOnClickOutside: false,
          closeOnEsc: false
        }
      )
    }
    
    /*
    if (!wsSupport) {
      swal(
        <div>
          <h2>지원하지 않는 브라우저</h2>
          <p className="px-3">
            죄송합니다. 사용하시는 브라우저는 WebSocket 연결을 지원하지 않는것 같습니다. 대시보드 서비스를 이용하시려면
          </p>
        </div>
      )
    }
    */

    return (
      <Container fluid>
        <Row>
          {/* 대시보드 사이드바 */}
          <Col xl={2} lg={3} md={3} sm={4} className="Dashboardroute-sidebar">

            <Container className="pl-0 pr-0 pb-1" id="sidebar-header">
              {/* 사이드바 헤더 */}
              <Row>
                <Col xs={isXXSsize ? 10 : 12} md={12} ref={this.sidebarHeaderRef}>
                  <div
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      paddingLeft: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      alt=""
                      src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`}
                      style={{ maxHeight: 40, marginRight: 15, borderRadius: '70%' }}
                    />
                    {guild ? guild?.name : '서버 정보를 불러오는 중...'}
                  </div>
                </Col>
                <Col xs={isXXSsize ? 2 : 0} className="text-center my-auto pl-1 d-sm-none d-md-none d-lg-none d-xl-none">
                  <Button
                    size="sm"
                    variant="secondary"
                    aria-controls="sidebar-collapse"
                    aria-expanded={this.state.sidebarOpen}
                    onClick={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })}
                    style={{
                      fontSize: '9pt'
                    }}
                  >
                    메뉴
                  </Button>
                </Col>
              </Row>
              {/* 사이드바 본문 */}
              <Row>
                <Col>
                  {
                    isXXSsize
                      ? (
                        <Collapse in={this.state.sidebarOpen} timeout={0}>
                          <div id="sidebar-collapse" className="Dashboardroute-sidebar-body">
                            <Sidebar guild={guild!} />
                          </div>
                        </Collapse>
                      )
                      : (
                        <div className="Dashboardroute-sidebar-body" style={{
                          height: `calc(100vh - ${this.sidebarHeaderRef.current?.clientHeight}px - 90px)`
                        }}>
                          <Sidebar guild={guild!} />
                        </div>
                      )
                  }
                </Col>
              </Row>
            </Container>
          </Col>

          {/* 대시보드 본문 */}
          <Col xl={10} lg={9} md={9} sm={8} className="Dashboardroute-body">
            {
              this.state.fetchDone
                ? <Switch>
                  <Route exact path={this.props.match.url} render={
                    () => <DashboardMain guild={guild} />
                  }
                  />
                  <Route exact path={`${this.props.match.url}/greeting`} render={
                    () => <DashboardGreeting guild={guild} />
                  }
                  />
                  <Route exact path={`${this.props.match.url}/members`} render={
                    () => <DashboardMembers guild={guild} />
                  }
                  />
                  <Route path={`${this.props.match.url}/members/:userid(\\d+)`} render={
                    (props) => <MemberDashboard guild={guild} {...props} />
                  }
                  />
                  <Route component={NotFound} />
                </Switch>
                : null
            }
          </Col>
        </Row>
      </Container>
    )
  }
}