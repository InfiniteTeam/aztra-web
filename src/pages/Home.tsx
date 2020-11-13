import React, { Component } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { animateScroll as scroll, Link as ScrollLink } from 'react-scroll'

import logoinv from '../aztra_inv.png'

import FeatImg1 from '../images/Home/feat-warn.png'
import FeatImg2 from '../images/Home/mobile.png'

export default class Home extends Component {
  render() {
    return (
      <>
        <Container fluid="sm" className="ct">
          <div className="Main-intro">
            <img src={logoinv} className="logo pb-3 img-view-only no-drag" alt="Aztra" />
            <h1 className="no-drag text-white">
              미래를 바꿀 디스코드 관리봇, Aztra
            </h1>
            <h2 className="no-drag text-white pb-5">
              다채롭고 깔끔한 디스코드 서버를 만들 수 있도록 도와드리겠습니다.
            </h2>
            <Button variant="aztra" size="lg" className="Main-button shadow">
              초대하기
            </Button>
            <Button as={ScrollLink} to="main-features" spy={true} smooth={true} offset={50} duration={500} variant="light" size="lg" className="Main-button shadow">
              자세히 알아보기
            </Button>
          </div>
        </Container>
        <Container fluid id="main-features" className="bg-dark text-white Main-features" style={{
          paddingTop: 200,
          paddingBottom: 500
        }}>
          <Container>
            <Row className="align-items-center px-3">
              <Col md={5}>
                <img src={FeatImg1} className="shadow mb-4" />
              </Col>
              <Col md={1} className="py-3" />
              <Col md={6} className="text-md-right">
                <h1>서버를 더욱 편리하게 관리하세요</h1>
                <p>기존의 헷갈리고 복잡한 관리봇이 아닌, 사용자 친화적으로 설계된 쉬운 사용법과 풍부한 기능으로 여러분의 서버를 더 성장시킬 수 있습니다.</p>
              </Col>
            </Row>
            <Row className="align-items-center flex-row-reverse px-3">
              <Col md={5}>
                <img src={FeatImg2} />
              </Col>
              <Col md={1} className="py-3" />
              <Col md={6}>
                <h1>모바일에서도 불편함 없이 사용하세요</h1>
                <p>Aztra 대시보드는 모바일에서도 사용하기 편하고 빠르게 처리되도록 개발되었습니다.</p>
              </Col>
            </Row>
          </Container>
        </Container>
      </>
    );
  }
}
