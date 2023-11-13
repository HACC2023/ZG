import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col } from 'react-bootstrap';

const SignOut = () => {
  Meteor.logout();
  return (
    <Col id="signout-page" className="text-center py-3"><h2>You are signed out.</h2></Col>
  );
};

export default SignOut;
