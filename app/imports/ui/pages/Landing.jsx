import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { EmojiSmile } from 'react-bootstrap-icons';

const Landing = () => (
  <div>
    <div className="landing-white-background">
      <Container className="justify-content-center text-center">
        <h2 className="p-4" style={{ color: 'black' }}>Visualize Toolset</h2>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image
              src="/images/Generative-AI.png"
              width="80%"
              height="80%"
              className="image-spacing"
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}
            />
          </Col>
          <Col xs={6}>
            <Image
              src="/images/Embedded-VR.png"
              width="80%"
              height="80%"
              className="image-spacing"
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}
            />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="bg-black">
      <Container className="justify-content-center text-center">
        <Row md={1} lg={2}>
          {/* eslint-disable-next-line max-len */}
          <iframe width="560" height="315" src="https://www.youtube.com/embed/fgE0OuY0J84?si=cZSjfNZRzep10EOO" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          <Col xs={6}>
            <br />
            <h2 style={{ color: 'white' }}>Our Mission</h2>
            {/* eslint-disable-next-line max-len */}
            <p style={{ color: 'white', fontSize: '110%' }}>We want to create a web portal that facilitates the civic engagement around how to rebuild Lahaina, Maui, including surveys, forums, sharing design concepts with visual and mappinig models for economic, environmental, etc. analysis.</p>
            <EmojiSmile style={{ color: 'white' }} size="25%" />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-white-background  text-center">
      <h2 className="p-4" style={{ color: 'black' }}>
        Civic Engagement
      </h2>
      <Container>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image
              src="/images/forum-page2.png"
              width="80%"
              height="80%"
              className="image-spacing"
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}
            />
          </Col>
          <Col xs={6}>
            <Image
              src="/images/Survey-Page.png"
              width="80%"
              height="80%"
              className="image-spacing"
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default Landing;
