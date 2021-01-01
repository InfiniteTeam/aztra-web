import React, { Component } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll'

import logoinv from '../aztra_inv.png'

import FeatImg1 from '../images/Home/feat-warn.png'
import FeatImg2 from '../images/Home/mobile.png'
import FeatImg3 from '../images/Home/member-manage.png'

export default class Home extends Component {
  render() {
    return (
      <>
        <Container fluid="sm">
          <div className="Main-intro d-flex align-items-center justify-content-center">
            <div>
              <h1 className="no-drag text-white" style={{
                fontSize: '25pt',
                wordBreak: 'keep-all'
              }}>
                미래를 바꿀 디스코드 관리봇, Aztra
              </h1>
              <h2 className="no-drag text-white pt-2 pb-5 font-weight-lighter" style={{
                fontSize: '14pt'
              }}>
                다채롭고 깔끔한 디스코드 서버를 만들 수 있도록 도와드리겠습니다.
              </h2>
              <Button variant="aztra" size="lg" className="Main-button shadow-lg" disabled={process.env.NODE_ENV === "production"}>
                {
                  process.env.NODE_ENV === "production"
                    ? "곧 공개됩니다"
                    : "초대하기"
                }
              </Button>
              <Button as={ScrollLink} to="main-features" spy={true} smooth={true} offset={50} duration={500} variant="light" size="lg" className="Main-button shadow-lg">
                자세히 알아보기
              </Button>
            </div>
          </div>
        </Container>
        <Container fluid id="main-features" className="bg-dark text-white Main-features" style={{
          paddingTop: 300,
          paddingBottom: 200
        }}>
          <Container>
            <Row className="align-items-center px-3" style={{ marginBottom: 200 }}>
              <Col md={5}>
                <img alt="경고 명령어" src={FeatImg1} className="shadow mb-4" />
              </Col>
              <Col md={1} className="py-3" />
              <Col md={6} className="text-lg-right">
                <h1>서버를 더욱 편리하게 관리하세요</h1>
                <p>기존의 헷갈리고 복잡한 관리봇이 아닌, 사용자 친화적으로 설계된 쉬운 사용법으로 여러분의 서버를 더 성장시킬 수 있습니다.</p>
              </Col>
            </Row>
            <Row className="align-items-center flex-row-reverse px-3" style={{ marginBottom: 200 }}>
              <Col md={5}>
                <img alt="모바일 환경" src={FeatImg2} />
              </Col>
              <Col md={1} className="py-3" />
              <Col md={6}>
                <h1>모바일에서도 불편함 없이 사용하세요</h1>
                <p>Aztra 대시보드는 모바일에서도 언제 어디서나 사용하기 편하도록 모바일 환경에도 신경써서 개발하고 있습니다.</p>
              </Col>
            </Row>
            <Row className="align-items-center px-3" style={{ marginBottom: 80 }}>
              <Col md={6}>
                <img alt="멤버 관리" src={FeatImg3} className="shadow mb-4" />
              </Col>
              <Col md={1} className="py-3" />
              <Col md={5} className="text-lg-right">
                <h1>다양한 기능을 제공합니다</h1>
                <p>봇 명령어만으로 봇을 세팅하고 관리하는 것은 한계가 있습니다. 대시보드를 통해 명령어만으로는 경험하지 못했던 매우 다양한 기능들을 제공합니다.</p>
              </Col>
            </Row>
          </Container>
        </Container>
      </>
    );
  }
}
