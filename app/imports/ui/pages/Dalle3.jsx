import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import LoadingSpinner from '../components/LoadingSpinner';

const Dalle3 = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = () => {
    setIsLoading(true);
    Meteor.call('generateImage', userInput, (error, imageUrl) => {
      setIsLoading(false);
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        setMessages([...messages, { type: 'user', text: userInput }, { type: 'ai', imageUrl: imageUrl }]);
        setUserInput('');
      }
    });
  };

  const imageFrameStyle = {
    border: '5px solid black',
    padding: '10px',
    marginBottom: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)',
    width: '500px',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    color: 'grey',
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="text-center p-4">
          <h3>Steps to Generating Image</h3>
          <h5 className="p-3">1. Compile a prompt consist of your design ideas</h5>
          <Image
            src="/images/Enter-Prompt.png"
            width={400}
            className="image-spacing"
            style={{
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}
          />
          <h5 className="p-5">2. Click generate and save your image by right clicking and save</h5>
          <Image
            src="/images/Returned-Picture.png"
            width={300}
            className="image-spacing"
            style={{
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' }}
          />
          <h5 className="p-5">3. Now share your design and engage with each other on rebuilding your home or Lahaina!!!</h5>
        </Col>
        <Col className="text-center p-4">
          <h3>Generative AI</h3>
          <h5>Powered By Dall-E3</h5>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !isLoading) generateImage(); }}
            style={{
              width: '75%',
              padding: '10px',
              fontSize: '1rem',
              margin: '10px 0',
            }}
          />
          <Button style={{ color: 'black', background: 'white' }} onClick={generateImage} disabled={isLoading}>Generate</Button>
          {isLoading && <LoadingSpinner />}
          <h3>Image</h3>
          <Col className="messages text-center p-4">
            {messages.map((message, index) => {
              if (message.imageUrl) {
                return (
                  <div key={index} style={imageFrameStyle}>
                    <Image width={500} src={message.imageUrl} alt="Generated from AI" />
                  </div>
                );
              }
              return (
                <div key={index} className={`message ${message.type}`}>
                  {message.text}
                </div>
              );
            })}
            {isLoading || messages.length === 0 ? (
              <div style={imageFrameStyle}>
                {isLoading ? 'Generating Image...' : 'Your Image Will Appear Here'}
              </div>
            ) : null}
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Dalle3;
