import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'

export default class ChangesNotSaved extends Component {
  render() {
    const sidebarWidth = document.getElementById('dashboard-sidebar')?.offsetWidth || 0

    return (
      <div className="px-auto" style={{
        position: 'fixed',
        zIndex: 9999,
        margin: '0 auto',
        bottom: 0,
        left: sidebarWidth + (window.innerWidth < 576 ? 0 : 40),
        right: 0,
        width: `100%-${sidebarWidth}`,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Card bg="aztra" className="shadow flex-row justify-content-between" style={{
          maxWidth: 900,
          width: '100%',
        }}>
          <Card.Header style={{
            fontFamily: 'NanumBarunGothic'
          }}>
            저장되지 않은 변경 사항이 있습니다!
          </Card.Header>
          <Card.Body className="py-0 d-flex justify-content-end px-3">
            <Button className="py-auto my-auto text-light mr-1" variant="link" size="sm">되돌리기</Button>
            <Button className="py-auto my-auto" variant="light" size="sm">저장하기</Button>
          </Card.Body>
        </Card>
      </div>

    )
  }
}