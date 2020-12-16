import React, { Component, createRef, RefObject } from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import axios, { AxiosError } from 'axios'
import oauth2 from '../datas/oauth'
import urljoin from 'url-join'
import { User } from '../types/DiscordTypes'
import { Link } from 'react-router-dom';

interface NavibarState {
  user: User | null
  loginDone: boolean
  expanded: boolean
}

export default class Navibar extends Component<{}, NavibarState> {
  state: NavibarState = {
    user: null,
    loginDone: false,
    expanded: false
  }

  getUserInfo = async (token: string) => {
    try {
      let res = await axios.get(urljoin(oauth2.api_endpoint, '/users/@me'), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.setState({ user: res.data })
      localStorage.setItem('cached_user', JSON.stringify(res.data))
    }
    catch (_e) {
      const e: AxiosError = _e
      this.setState({ user: null })
      localStorage.removeItem('cached_user')
      e.response?.status === 401 && window.location.assign('/login')
    }
    finally {
      this.setState({ loginDone: true })
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    !token || this.getUserInfo(token)
  }

  handleOnToggle = (expanded: boolean) => {
    this.setState({ expanded })
  }

  closeNavbar = () => {
    this.setState({ expanded: false })
    console.log('dsds')
  }

  render() {
    const user = this.state.user || JSON.parse(localStorage.getItem('cached_user')!)
    return (
      <>
        <div style={{ paddingBottom: 57 }}>
          <Navbar bg="dark" expand="md" onToggle={this.handleOnToggle} expanded={this.state.expanded} fixed="top" className="no-drag navbar-dark shadow">
            <Container fluid="md">
              <Navbar.Brand as={Link} to="/" style={{
                fontFamily: 'NanumSquare',
                fontWeight: 600
              }}>
                Aztra {process.env.NODE_ENV === "development" && 'βeta'}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbar-nav" />
              <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto" onSelect={this.closeNavbar}>
                  <Nav.Link as={Link} to="/" href="/" className="Navlink">
                    홈
                  </Nav.Link>
                  <Nav.Link as={Link} to="/servers" href="/servers" className="Navlink">
                    대시보드
                  </Nav.Link>
                  <Nav.Link as={Link} to="/docs" href="/docs" className="Navlink">
                    봇 가이드
                  </Nav.Link>
                </Nav>
                <Nav>
                  {
                    user
                      ?
                      <>
                        <div style={{
                          justifyContent: 'left',
                          display: 'flex'
                        }}>
                          <img alt={user.username} src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}` : `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`} style={{
                            maxHeight: 32,
                            borderRadius: '700%',
                            overflow: 'hidden',
                            marginRight: 5,
                            marginTop: 5
                          }} />
                          <NavDropdown title={`${user.username}#${user.discriminator}`} id="nav-dropdown" className="dropdown-menu-dark" style={{
                            fontSize: '12.5pt'
                          }}>

                            <NavDropdown.Item className="dropdown-item-dark" href="/logout">
                              로그아웃
                            </NavDropdown.Item>
                          </NavDropdown>
                        </div>
                      </>
                      : <Nav.Link href="/login">로그인</Nav.Link>
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  }
}
