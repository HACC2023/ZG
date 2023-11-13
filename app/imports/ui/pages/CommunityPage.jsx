import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Pagination } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/profile';
import Profile from '../components/Profile';

const CommunityPage = () => {
  const profilesPerPage = 12;
  const profilesPerRow = 4;
  const [activePage, setActivePage] = useState(1);

  const { ready, profiles } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastProfile = activePage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(profiles.length / profilesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={12}>
          <Col className="text-center">
            <h2 style={{ marginBottom: '30px' }}>Meet Our Community</h2>
          </Col>
          <Row xs={1} md={2} lg={profilesPerRow} className="g-4">
            {currentProfiles.map((profile) => <Col key={profile.owner}><Profile profile={profile} /></Col>)}
          </Row>
          {pageNumbers.length > 1 && (
            <Pagination className="justify-content-center mt-3">
              {pageNumbers.map(number => (
                <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageChange(number)}>
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default CommunityPage;
