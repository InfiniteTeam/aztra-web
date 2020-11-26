import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Collapse, Nav } from 'react-bootstrap';
import { PartialGuild } from '../types/DiscordTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faExclamationTriangle, faHome, faUserPlus, faUsersCog } from '@fortawesome/free-solid-svg-icons';

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
          paddingRight: 0,
          fontFamily: "NanumSquare",
          fontSize: '1.05rem'
        }}
      >
        <Nav.Item>
          <Nav.Link className="d-flex" as={Link} to={`/dashboard/${guild?.id}`}>
            <div style={iconStyle} className="mr-2">
              <FontAwesomeIcon icon={faHome} color="LightSlateGrey" size="sm" />
            </div>
            메인
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="d-flex" as={Link} to={`/dashboard/${guild?.id}/greeting`}>
            <div style={iconStyle} className="mr-2">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" color="LightSlateGrey" size="sm" />
            </div>
            환영 메시지
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="d-flex" as={Link} to={`/dashboard/${guild?.id}/members`}>
            <div style={iconStyle} className="mr-2">
              <FontAwesomeIcon icon={faUsersCog} className="mr-2" color="LightSlateGrey" size="sm" />
            </div>
            멤버 관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="d-flex" as={Link} to={`/dashboard/${guild?.id}/warns`}>
            <div style={iconStyle} className="mr-2">
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" color="LightSlateGrey" size="sm" />
            </div>
            경고 관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="d-flex" as={Link} to={`/dashboard/${guild?.id}/statistics`}>
            <div style={iconStyle} className="mr-2">
              <FontAwesomeIcon icon={faChartLine} className="mr-2" color="LightSlateGrey" size="sm" />
            </div>
            통계
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ marginLeft: '-3px', paddingLeft: 0 }} onClick={() => setWarnManageOpen(!warnManageOpen)} aria-controls="warn-manage-collapse" aria-expanded={warnManageOpen}>{warnManageOpen ? "▾ " : "▸ "}드롭다운</Nav.Link>
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
          <Nav.Link as={Link} to={`/dashboard/${guild?.id}/profanity_filter`}>
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
