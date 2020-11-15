import React from 'react'
import { Button, ButtonGroup, Card, Dropdown, DropdownButton } from 'react-bootstrap'
import Badge from 'react-bootstrap/esm/Badge'
import { MemberMinimal } from '../../types/DiscordTypes'

export interface MemberListCardProps {
  member: MemberMinimal
}

export default class MemberListCard extends React.PureComponent<MemberListCardProps, {}> {
  render() {
    const member = this.props.member

    return (
      <Card bg="dark" className="mb-2">
        <Card.Body className="d-flex py-1 justify-content-between">
          <div className="d-flex">
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
          </div>
          <div className="my-auto d-flex">
            <Dropdown as={ButtonGroup} className="dropdown-menu-dark">
              <Button variant="dark">관리</Button>
              <Dropdown.Toggle split variant="dark"/>

              <Dropdown.Menu>
                <Dropdown.Item className="dropdown-item-dark">ㅎㅇ</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Body>
      </Card>
    )
  }
}