import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default class Title extends Component {
  render() {
    return (
      <>
        <Container fluid className={`Title-section-bg ${this.props.className} no-drag`}>
          <Container fluid="sm" className="ct Title-ct text-center">
            <h1 className="Title-title">
              {this.props.title}
            </h1>
            <h3 className="Title-subtitle">
              {this.props.subtitle}
            </h3>
          </Container>
        </Container>
      </>
    );
  }
}