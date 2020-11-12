import React from 'react'
import { Card } from 'react-bootstrap'
import Badge from 'react-bootstrap/esm/Badge'
import { MemberMinimal } from '../../types/DiscordTypes'

export interface MemberListCardProps {
  member: MemberMinimal
}

export default class MemberListCard extends React.Component<MemberListCardProps, {}> {
  render() {
    console.log('조짐')

    const member = this.props.member

    return (
      <Card bg="dark" className="mb-2">
        <Card.Header className="d-flex py-1">
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
        </Card.Header>
      </Card>
    )
  }
}