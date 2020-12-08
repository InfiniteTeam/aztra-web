import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

export default function MobileAlert() {
  const [hidden, setHidden] = useState<boolean>(true)

  useEffect(() => {
    let value = localStorage.getItem('hideMobileAlert')
    setHidden(value === 'true')
  }, [])

  const onClose = () => {
    localStorage.setItem('hideMobileAlert', 'true')
    setHidden(true)
  }

  return !hidden ? (
    <Alert variant="warning" className="d-flex">
      <FontAwesomeIcon icon={faExclamationTriangle} color="darkorange" size="lg" className="my-auto mr-2" />
      <div>
        이 페이지는 좁은 모바일 화면에서 확인하기 불편하기에 PC 버전에서 이용하시는 것을 권장드립니다.
        <div className="d-flex justify-content-end mt-3">
          <Alert.Link onClick={onClose}>
            다시 보지않기
          </Alert.Link>
        </div>
      </div>
    </Alert>
  ) : null
}