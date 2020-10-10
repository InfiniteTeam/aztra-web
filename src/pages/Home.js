import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import logoinv from '../aztra_inv.png'

export default class Home extends Component {
  render() {
    return (
      <>
        <Container fluid>
          <Container fluid="sm" className="ct">
            <div className="Main-intro">
              <img src={logoinv} className="logo pb-3 img-view-only no-drag" alt="Aztra" />
              <h1 className="no-drag text-white">
                미래를 바꿀 디스코드 관리봇, Aztra
              </h1>
              <h2 className="no-drag text-white pb-5">
                다채롭고 깔끔한 디스코드 서버를 만들 수 있도록 도와드리겠습니다.
              </h2>
              <Button variant="aztra" size="lg" className="Main-button">
                초대하기
              </Button>
              <Button variant="light" size="lg" className="Main-button">
                자세히 알아보기
              </Button>
            </div>
          </Container>
        </Container>
      </>
    );
  }
}
