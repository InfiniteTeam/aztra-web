import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons'

const DocsMain: React.FC = () => {
  return (
    <Container fluid="sm" className="text-white py-5" style={{ minHeight: '100vh' }}>
      <Row className="justify-content-center" style={{padding: '40px 0'}}>
        <Col>
          <div className="text-center">
            <h2>Aztra 봇 가이드</h2>
            <div style={{ wordBreak: 'keep-all' }}>Aztra를 더 똑똑하게 사용하는 방법들을 살펴보세요.</div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={4} >
          <Card bg="dark" className="shadow cursor-pointer" onClick={() => { }}>
            <Card.Body className="d-flex">
              <div>
                <Card.Title>
                  Aztra 명령어 가이드
                </Card.Title>
                <Card.Text className="" style={{ color: 'lightgray' }}>
                  Aztra 전체 명령어 가이드
                </Card.Text>
              </div>
              <div className="my-auto ml-auto" style={{ transform: 'scale(1.5)' }}>
                <ArrowForwardIcon />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default DocsMain