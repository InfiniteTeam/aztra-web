import React from 'react'
import { faCheckCircle, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'react-bootstrap'

interface ChannelCardData {
  channelName: string
  parentChannelName?: string
}

interface ChannelSelectCardProps {
  channelData: ChannelCardData
  selected?: boolean
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
}

const ChannelSelectCard: React.FC<ChannelSelectCardProps> = ({ channelData, selected, onClick }) => {
  return (
    <Card bg="dark" className="mr-2" onClick={onClick} style={{
      cursor: 'pointer',
      marginBottom: 5
    }}>
      <Card.Body className="d-flex justify-content-between py-1 my-0 pr-2">
        <div className="d-flex">
          <FontAwesomeIcon icon={faHashtag} className="mr-2 my-auto" size="sm" />
          <div style={{
            fontSize: '13pt'
          }}>
            {channelData.channelName}
          </div>
          <div className="ml-2 small" style={{
            color: 'gray'
          }}>
            {channelData.parentChannelName}
          </div>
        </div>
        {selected && <FontAwesomeIcon icon={faCheckCircle} className="mr-2 my-auto text-success" size="lg" />}
      </Card.Body>
    </Card>
  )
}

export default ChannelSelectCard