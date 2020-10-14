import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap';
import { PartialGuild } from '../types/DiscordTypes'

interface SidebarProps {
  guild: PartialGuild | null
}

export default class Sidebar extends Component<SidebarProps> {
  render() {
    const guild = this.props.guild
    return (
      <>
        <Nav 
          className="col-md-12 d-block d-md-block"
          style={{
            paddingRight: 0,
          }}
        >
          <Nav.Item>
            <Nav.Link as={Link} to={`/dashboard/${guild?.id}`}>메인</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={`/dashboard/${guild?.id}/greeting`}>환영 메시지</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>봇 세부 권한 관리</Nav.Link>
          </Nav.Item>
          {
            Array.from(Array(25).keys()).map((one, index) => (
              <Nav.Item key={index}>
                <Nav.Link>옵션 {index+1}</Nav.Link>
              </Nav.Item>
            ))
          }
        </Nav>
      </>
    )
  }
}
