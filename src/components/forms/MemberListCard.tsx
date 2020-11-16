import React from 'react'
import { Button, ButtonGroup, Card, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap'
import Badge from 'react-bootstrap/esm/Badge'
import { Link } from 'react-router-dom'
import { MemberMinimal } from '../../types/DiscordTypes'

export interface MemberListCardProps {
  member: MemberMinimal
  guildId: string
}

export default class MemberListCard extends React.PureComponent<MemberListCardProps, {}> {
  render() {
    const member = this.props.member

    return (
      <Card bg="dark" className="mb-2">
        <Card.Body as={Row} className="d-flex py-1 justify-content-between">
          <Col className="d-flex">
            <img className="my-auto" alt={member.user.tag!} src={member.user.avatar ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.jpeg?size=64` : member.user.defaultAvatarURL} style={{ maxHeight: 40, marginRight: 15, borderRadius: '70%' }} />
            <div>
              <div className="d-flex">
                <div>
                  {member.nickname || member.user.username}
                </div>
                <h6>
                  {member.user.bot && <Badge className="ml-2 my-auto" variant="blurple">BOT</Badge>}
                </h6>
              </div>
              <div className="text-muted font-weight-bold" style={{
                fontSize: '11pt'
              }}>
                @{member.user.tag}
              </div>
            </div>
          </Col>
          <Col className="my-auto d-flex col-auto">
            <Dropdown as={ButtonGroup} className="dropdown-menu-dark d-flex">
              <Button className="my-auto" variant="dark" size="sm" as={Link} to={`/dashboard/${this.props.guildId}/members/${this.props.member.user.id}`}>
                관리
              </Button>
              <Dropdown.Toggle split variant="dark" size="sm"/>

              <Dropdown.Menu>
                <Dropdown.Item className="dropdown-item-dark">ㅎㅇ</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Card.Body>
      </Card>
    )
  }
}