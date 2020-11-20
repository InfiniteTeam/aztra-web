import React from 'react'
import { Button, ButtonGroup, Card, Col, Dropdown, Row, Container } from 'react-bootstrap'
import Badge from 'react-bootstrap/esm/Badge'
import { MemberMinimal } from '../../types/DiscordTypes'

export interface MemberListCardProps {
  member: MemberMinimal
  guildId: string
}

export default class MemberListCard extends React.PureComponent<MemberListCardProps, {}> {
  render() {
    const member = this.props.member

    return (
      <Card as={Container} fluid bg="dark" className="mb-2">
        <Card.Body as={Row} className="flex-column flex-sm-row py-1">
          <Col sm={8} className="d-flex pb-2 pb-sm-0 px-0 align-items-center">
            <img className="my-auto" alt={member.user.tag!} src={member.user.avatar ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.jpeg?size=64` : member.user.defaultAvatarURL} style={{ maxHeight: 40, marginRight: 15, borderRadius: '70%' }} />
            <div>
              <div className="d-flex">
                <span className="text-break">
                  {member.displayName}
                </span>
                <span>
                  {member.user.bot && <Badge className="ml-2 my-auto" variant="blurple">BOT</Badge>}
                </span>
              </div>
              <div className="text-muted font-weight-bold text-break" style={{
                fontSize: '11pt'
              }}>
                @{member.user.tag}
              </div>
            </div>
          </Col>
          <Col sm={4} className="d-flex justify-content-sm-end px-0">
            <Dropdown as={ButtonGroup} className="dropdown-menu-dark d-flex">
              <Button className="my-auto" variant="dark" size="sm" href={`/dashboard/${this.props.guildId}/members/${this.props.member.user.id}`}>
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