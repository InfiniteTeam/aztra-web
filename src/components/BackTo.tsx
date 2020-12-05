import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface BackToProps {
  name: string
  href?: string
  className?: string
}

export default function BackTo({ name, href, className }: BackToProps) {
  return <div className={className}>
    <a className="d-flex align-items-center" href={href}>
      <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
      [{name}] (으)로 돌아가기
    </a>
  </div>
}