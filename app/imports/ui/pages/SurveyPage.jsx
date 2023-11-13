import React, { useState } from 'react';
import { Carousel, Col, Form, Nav, Row, Pagination } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PlusCircleFill } from 'react-bootstrap-icons';
import Survey from '../components/Survey';
import LoadingSpinner from '../components/LoadingSpinner';
import { Surveys } from '../../api/survey/survey';

const SurveyPage = () => {
  const [index, setIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const surveysPerPage = 3;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setIndex(0);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1);
  };

  const carouselItemStyle = {
    backgroundColor: 'black',
    height: '350px',
  };

  const { ready, surveys } = useTracker(() => {
    const subscription = Meteor.subscribe(Surveys.userPublicationName);
    const rdy = subscription.ready();
    const surveyItems = Surveys.collection.find({}).fetch();
    return {
      surveys: surveyItems,
      ready: rdy,
    };
  }, []);

  const filteredSurveys = surveys.filter(survey => survey.contents.toLowerCase().includes(searchInput.toLowerCase()));

  const totalPages = Math.ceil(filteredSurveys.length / surveysPerPage);
  const indexOfLastSurvey = currentPage * surveysPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - surveysPerPage;
  const currentSurveys = filteredSurveys.slice(indexOfFirstSurvey, indexOfLastSurvey);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return ready ? (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {currentSurveys.map((survey) => (
          <Carousel.Item key={survey._id} style={carouselItemStyle}>
            <Survey survey={survey} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Form className="p-3">
        <Form.Group controlId="searchBar">
          <Row className="justify-content-center">
            <Col xs={6} md={4}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Row className="justify-content-center">
        <Col xs={12} className="text-center p-3">
          <Nav.Link href="/addsurvey">
            <PlusCircleFill style={{ fontSize: '2rem', color: 'black' }} />
          </Nav.Link>
        </Col>
        <Col xs={12} className="p-3">
          <Pagination className="justify-content-center">{paginationItems}</Pagination>
        </Col>
      </Row>
    </>
  ) : <LoadingSpinner />;
};

export default SurveyPage;
