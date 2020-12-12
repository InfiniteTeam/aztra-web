import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

interface BackToProps {
  name: string
  to: string
  className?: string
}

export default function BackTo({ name, to, className }: BackToProps) {
  return <div className={className}>
    <Link className="d-flex align-items-center" to={to}>
      <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
      [{name}] (으)로 돌아가기
    </Link>
  </div>
}