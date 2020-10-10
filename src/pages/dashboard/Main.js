import React, { Component } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap'

export default class Main extends Component {
  render() {
    const guild = this.props.guild

    return (
      <div style={{
        fontFamily: 'NanumBarunGothic'
      }}>
        <Row>
          <h3>서버 정보</h3>
        </Row>
        <Row className="dashboard-section">
          <Col className="col-auto">
            <Card className="Dashboard-card flex-md-row" bg="dark">
              <Card.Body className="text-center text-md-left">
                <Card.Img
                  src={`https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`} style={{
                    height: 120,
                    width: 120
                  }}
                />
              </Card.Body>
              <Card.Body className="pl-md-0 pr-md-5" style={{
                
              }}>
                <Card.Title className="font-weight-bold text-center text-md-left" style={{
                  fontFamily: 'NanumSquare'
                }}>
                  {guild?.name}
                </Card.Title>
                <Card.Text as="div" className="lines">
                  <p>
                    전체 멤버 수: x
                  </p>
                  <p>
                    온라인 멤버 수: y
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col />
        </Row>

        <Row className="justify-content-between">
          <h3>알림 센터</h3>
          <div>
            <Button variant="secondary" size="sm">더 보기</Button>
          </div>
        </Row>
        <Row className="dashboard-section">
          <Col>
            <Card className="Dashboard-card" bg="dark">
              <Card.Body>
                <Card.Title>멤버 차단됨</Card.Title>
                <Card.Text>
                  <span className="font-weight-bold">Dacon#0001</span>멤버가 차단되었습니다.
                </Card.Text>
                <Button variant="secondary" size="sm">자세히</Button>
              </Card.Body>
            </Card>
          </Col>
          {
            Array.from(Array(3).keys()).map(one =>
              <Col>
                <Card className="Dashboard-card" bg="dark">
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                </Card.Text>
                    <Button variant="secondary" size="sm">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          }
        </Row>
      </div>
    )
  }
}