import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'

export default class ChangesNotSaved extends Component {
  render() {
    const sidebarWidth = document.getElementById('dashboard-sidebar')?.offsetWidth || 0

    return (
      <div className="px-4" style={{
        position: 'fixed',
        zIndex: 9999,
        margin: '0 auto',
        bottom: 25,
        left: sidebarWidth + (window.innerWidth < 576 ? 0 : 40),
        right: 0,
        width: `100%-${sidebarWidth}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Card bg="aztra" className="shadow-lg" style={{
          maxWidth: 1200,
          width: '100%',
        }}>
          <Card.Body className="py-2 my-0 d-flex px-2">
            <div className="my-auto pl-2" style={{
              fontFamily: 'NanumBarunGothic'
            }}>
              저장되지 않은 변경 사항이 있습니다!
            </div>
            <div className="d-flex justify-content-end ml-auto">
              <Button className="py-auto my-auto text-light mr-1" variant="link" size="sm">되돌리기</Button>
              <Button className="py-auto my-auto" variant="light" size="sm">저장하기</Button>
            </div>
          </Card.Body>
        </Card>
      </div>

    )
  }
}