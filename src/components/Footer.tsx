import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import preval from 'preval.macro';
import links from '../datas/links.json'

import styles from './styles/Footer.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

const HIDDEN_COUNT = 5

export interface FooterState {
  hiddenCount: number
}

export default class Footer extends Component<{}, FooterState> {
  state: FooterState = {
    hiddenCount: 0
  }

  hiddenClick = () => {
    this.state.hiddenCount < HIDDEN_COUNT && this.setState({ hiddenCount: this.state.hiddenCount + 1 })
  }

  render() {
    return (
      <>
        <footer className={styles.Footer}>
          <Container fluid="sm" className="text-center text-md-left">
            <Row>
              <Col md={5} className="mt-md-0 mt-3">
                <h4 className="text-uppercase no-drag" onClick={this.hiddenClick}>
                  Aztra {process.env.NODE_ENV === "development" && 'Beta'}
                </h4>
                <p className="mb-2" style={{
                  fontSize: '13pt'
                }}>
                  미래를 바꿀 디스코드 관리봇.
                </p>
                {
                  this.state.hiddenCount >= HIDDEN_COUNT && (
                    <p style={{
                      fontFamily: "Consolas",
                      fontWeight: 'normal',
                      fontSize: '11pt'
                    }}>
                      Build Date: {preval`module.exports = new Date().toLocaleString()`}
                    </p>
                  )
                }
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
            <div className={cx("FooterCopyright", "text-center")}>
              Copyright © 2020 InfiniteTeam All rights reserved.
            </div>
          </Container>
        </footer>
      </>
    );
  }
}