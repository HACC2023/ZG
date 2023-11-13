import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer mt-auto py-3 bg-black">
    <Container>
      <Row>
        <Col className="text-center" style={{ color: 'white' }}>
          Envision Lahaina
          {' '}
          <br />
          By Zhuocheng(Joe) Gan
          <br />
          Email: Envisionlahaina@gmail.com
          {' '}
          <br />
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
