import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { PartialGuild } from '../types/DiscordTypes'
import {
  Home as HomeIcon,
  PersonAdd as PersonAddIcon,
  Group as GroupIcon,
  ReportProblemRounded as ReportProblemRoundedIcon,
  DataUsage as DataUsageIcon,
  History as HistoryIcon
} from '@material-ui/icons'

interface SidebarProps {
  guild: PartialGuild
  onSelect?: (eventKey: string | null, e: React.SyntheticEvent<unknown>) => void
}

export default function Sidebar(props: SidebarProps) {
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
        onSelect={props.onSelect}
      >
        <Nav.Item>
          <Nav.Link
            className="d-flex mb-1"
            as={Link}
            to={`/dashboard/${guild?.id}`}
            href={`/dashboard/${guild?.id}`}
            active={window.location.pathname === `/dashboard/${guild?.id}`}
          >
            <div style={iconStyle} className="mr-3">
              <HomeIcon />
            </div>
            메인
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="d-flex mb-1"
            as={Link}
            to={`/dashboard/${guild?.id}/greetings`}
            href={`/dashboard/${guild?.id}/greetings`}
            active={window.location.pathname.startsWith(`/dashboard/${guild?.id}/greetings`)}
          >
            <div style={iconStyle} className="mr-3">
              <PersonAddIcon />
            </div>
            환영 메시지
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="d-flex mb-1"
            as={Link}
            to={`/dashboard/${guild?.id}/members`}
            href={`/dashboard/${guild?.id}/members`}
            active={window.location.pathname.startsWith(`/dashboard/${guild?.id}/members`)}
          >
            <div style={iconStyle} className="mr-3">
              <GroupIcon />
            </div>
            멤버 관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="d-flex mb-1"
            as={Link}
            to={`/dashboard/${guild?.id}/warns`}
            href={`/dashboard/${guild?.id}/warns`}
            active={window.location.pathname.startsWith(`/dashboard/${guild?.id}/warns`)}
          >
            <div style={iconStyle} className="mr-3">
              <ReportProblemRoundedIcon />
            </div>
            경고 관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="d-flex mb-1"
            as={Link}
            to={`/dashboard/${guild?.id}/leveling`}
            href={`/dashboard/${guild?.id}/leveling`}
            active={window.location.pathname.startsWith(`/dashboard/${guild?.id}/leveling`)}
          >
            <div style={iconStyle} className="mr-3">
              <DataUsageIcon />
            </div>
            레벨링 설정
          </Nav.Link>
        </Nav.Item>
        {
          process.env.NODE_ENV === "development" && (
            <Nav.Item>
              <Nav.Link
                className="d-flex mb-1"
                as={Link}
                to={`/dashboard/${guild?.id}/logging`}
                href={`/dashboard/${guild?.id}/logging`}
                active={window.location.pathname.startsWith(`/dashboard/${guild?.id}/logging`)}
              >
                <div style={iconStyle} className="mr-3">
                  <HistoryIcon style={{ transform: 'scale(1.1)' }} />
                </div>
            로깅 설정
          </Nav.Link>
            </Nav.Item>
          )
        }
      </Nav>
    </>
  )

}
