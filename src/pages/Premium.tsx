import React, { Component } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

interface FeaturesListProps {
  feats: string[]
}

function FeaturesList(props: FeaturesListProps) {
  return <>
    {props.feats.map(feat =>
      <div className="d-flex align-items-center mb-2">
        <FontAwesomeIcon icon={faCheckCircle} color="limegreen" className="mr-2" />
        <div>
          {feat}
        </div>
      </div>
    )}
  </>
}

export default class Premium extends Component {
  render() {
    return (
      <Container fluid="sm" className="text-light" style={{
        paddingTop: 60,
        paddingBottom: 100
      }}>
        <h4 className="pb-5" style={{
          fontFamily: "NanumSquare"
        }}>
          Aztra 프리미엄으로, 서버를 더욱 풍요롭게.
        </h4>
        <Container>
          <Row>
            <Col sm={6} lg={3} className="mb-4">
              <Card bg="dark" className="h-100 shadow">
                <Card.Header className="text-center" style={{
                  fontFamily: "NanumSquare",
                  fontWeight: "bold",
                  fontSize: "14pt"
                }}>
                  Aztra Micro
                </Card.Header>
                <Card.Body className="pt-5 px-4">
                  <h3 className="pb-4 text-center">기본</h3>
                  <FeaturesList feats={['환영 메시지', '멤버 경고 기능']} />
                </Card.Body>
              </Card>
            </Col>

            <Col sm={6} lg={3} className="mb-4">
              <Card bg="dark" className="h-100 shadow">
                <Card.Header className="text-center" style={{
                  fontFamily: "NanumSquare",
                  fontWeight: "bold",
                  fontSize: "14pt"
                }}>
                  Aztra Mini 플랜
                </Card.Header>
                <Card.Body className="pt-5 px-4">
                  <h3 className="pb-4 text-center">￦2,900/월</h3>
                  <FeaturesList feats={['환영 메시지', '멤버별 상세 관리 페이지', '서버 통계', '멤버 경고 기능']} />
                </Card.Body>
                <div className="text-center pb-2">
                  <Button className="mb-3 mt-1" variant="aztra" size="sm" style={{
                    minWidth: 120
                  }}>
                    구매
                  </Button>
                </div>
              </Card>
            </Col>

            <Col sm={6} lg={3} className="mb-4">
              <Card bg="dark" className="h-100 shadow" onMouseOver={() => console.log('dsdsdsdss')}>
                <Card.Header className="text-center" style={{
                  fontFamily: "NanumSquare",
                  fontWeight: "bold",
                  fontSize: "14pt"
                }}>
                  Aztra Mega 플랜
                </Card.Header>
                <Card.Body className="pt-5 px-4">
                  <h3 className="pb-4 text-center">￦4,800/월</h3>
                  <FeaturesList feats={['환영 메시지', '멤버별 상세 관리 페이지', '서버 통계', '멤버 경고 기능', '역할 일괄 추가 및 제거', '티켓 기능']} />
                </Card.Body>
                <div className="text-center pb-2">
                  <Button className="mb-3 mt-1" variant="aztra" size="sm" style={{
                    minWidth: 120
                  }}>
                    구매
                  </Button>
                </div>
              </Card>
            </Col>

            <Col sm={6} lg={3} className="mb-4">
              <Card bg="dark" className="h-100 shadow">
                <Card.Header className="text-center" style={{
                  fontFamily: "NanumSquare",
                  fontWeight: "bold",
                  fontSize: "14pt"
                }}>
                  Aztra Master 플랜
                </Card.Header>
                <Card.Body className="pt-5 px-4">
                  <h3 className="pb-4 text-center">￦9,800/월</h3>
                  <FeaturesList feats={['모든 기능', '실시간 1:1 고객 지원']} />
                </Card.Body>
                <div className="text-center pb-2">
                  <Button className="mb-3 mt-1" variant="aztra" size="sm" style={{
                    minWidth: 120
                  }}>
                    구매
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}