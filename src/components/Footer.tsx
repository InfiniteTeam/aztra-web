import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import links from '../datas/links.json'

export default class Home extends Component {
  render() {
    return (
      <>
        <footer className="Footer">
          <Container fluid="sm" className="text-center text-md-left">
            <Row>
              <Col md={5} className="mt-md-0 mt-3">
                <h4 className="text-uppercase">
                  Aztra
                </h4>
                <p>
                  미래를 바꿀 디스코드 관리봇.
                </p>
              </Col>
              <Col md={2}>
                <h5>사이트</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/">홈</a>
                  </li>
                </ul>
              </Col>
              <Col md={2}>
                <h5>팀</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href={links.teamsite}>팀 홈페이지</a>
                  </li>
                </ul>
              </Col>
              <Col md={2}>
                <h5>가이드</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href={links.privacy}>개인정보 처리방침</a>
                  </li>
                </ul>
              </Col>
            </Row>
            <div className="Footer-copyright text-center">
              Copyright © 2020 InfiniteTeam All rights reserved.
            </div>
          </Container>
        </footer>
      </>
    );
  }
}