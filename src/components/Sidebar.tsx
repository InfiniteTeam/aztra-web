import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Collapse, Nav } from 'react-bootstrap'
import { PartialGuild } from '../types/DiscordTypes'
import {
  Home as HomeIcon,
  PersonAdd as PersonAddIcon,
  Group as GroupIcon,
  ReportProblemRounded as ReportProblemRoundedIcon,
  Assessment as AssessmentIcon
} from '@material-ui/icons'

interface SidebarProps {
  guild: PartialGuild
}

export default function Sidebar(props: SidebarProps) {
  const [warnManageOpen, setWarnManageOpen] = useState(false)

  const iconStyle: React.CSSProperties = {
    height: 20,
    width: 20,
  }

  const guild = props.guild
  return (
    <>
      <Nav
        id="dashboard-sidebar"
        className="col-md-12 d-block d-md-block"
        style={{
          paddingRight: 0
        }}
      >
        <Nav.Item>
          <Nav.Link className="d-flex mb-1" as={Link} to={`/dashboard/${guild?.id}`} active={window.location.pathname === `/dashboard/${guild?.id}`}>
            <div style={iconStyle} className="mr-3">
              <HomeIcon />
            </div>
            메인
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="d-flex mb-1" as={Link} to={`/dashboard/${guild?.id}/greetings`} active={window.location.pathname.startsWith(`/dashboard/${guild?.id}/greetings`)}>
            <div style={iconStyle} className="mr-3">
              <PersonAddIcon />
            </div>
            환영 메시지
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="d-flex mb-1" as={Link} to={`/dashboard/${guild?.id}/members`} active={window.location.pathname.startsWith(`/dashboard/${guild?.id}/members`)}>
            <div style={iconStyle} className="mr-3">
              <GroupIcon />
            </div>
            멤버 관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="d-flex mb-1" as={Link} to={`/dashboard/${guild?.id}/warns`} active={window.location.pathname.startsWith(`/dashboard/${guild?.id}/warns`)}>
            <div style={iconStyle} className="mr-3">
              <ReportProblemRoundedIcon />
            </div>
            경고 관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="d-flex mb-1" as={Link} to={`/dashboard/${guild?.id}/statistics`} active={window.location.pathname.startsWith(`/dashboard/${guild?.id}/statistics`)}>
            <div style={iconStyle} className="mr-3">
              <AssessmentIcon />
            </div>
            통계
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="mb-1" style={{ marginLeft: '-3px', paddingLeft: 0 }} onClick={() => setWarnManageOpen(!warnManageOpen)} aria-controls="warn-manage-collapse" aria-expanded={warnManageOpen}>{warnManageOpen ? "▾ " : "▸ "}드롭다운</Nav.Link>
          <Collapse in={warnManageOpen}>
            <div id="warn-manage-collapse" className="ml-3">
              <Nav.Item>
                <Nav.Link as={Link} to="#" className="small">옵션1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="#" className="small">옵션2</Nav.Link>
              </Nav.Item>
            </div>
          </Collapse>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="mb-1" as={Link} to={`/dashboard/${guild?.id}/profanity_filter`} active={window.location.pathname === `/dashboard/${guild?.id}/profanity_filter`}>
            자동 욕설 필터링
            <Badge variant="aztra" className="ml-2">프리미엄</Badge>
          </Nav.Link>
        </Nav.Item>
        {
          Array.from(Array(0).keys()).map((one, index) => (
            <Nav.Item key={index}>
              <Nav.Link>옵션 {index + 1}</Nav.Link>
            </Nav.Item>
          ))
        }
      </Nav>
    </>
  )

}
