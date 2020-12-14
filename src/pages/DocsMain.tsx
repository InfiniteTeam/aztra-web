import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const DocsMain: React.FC = () => {
  return (
    <Container fluid style={{
      backgroundColor: 'rgb(242, 242, 245)'
    }}>
      <Container fluid="sm" className="py-5" style={{ minHeight: '100vh' }}>
        <Row className="justify-content-center" style={{ padding: '40px 0' }}>
          <Col>
            <div className="text-center">
              <h2>Aztra 봇 가이드</h2>
              <div style={{ wordBreak: 'keep-all' }}>Aztra를 더 똑똑하게 사용하는 방법들을 살펴보세요.</div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6} lg={4} >
            <Card as={Link} to="/docs/commands-guide/getting-started"
              className="shadow-sm cursor-pointer text-dark text-decoration-none" style={{
                border: 'none'
              }}>
              <Card.Body className="d-flex">
                <div>
                  <Card.Title>
                    Aztra 명령어 가이드
                  </Card.Title>
                  <Card.Text>
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

        <Row className="justify-content-center" style={{ marginTop: 120 }}>
          <small>가독성 향상을 위해 화이트 모드가 적용됩니다.</small>
        </Row>
      </Container>
    </Container>
  )
}

export default DocsMain