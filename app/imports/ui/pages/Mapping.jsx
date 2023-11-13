import React, { useState, useEffect } from 'react';
import { Button, Col, Nav, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';

const mapsData = [
  {
    title: 'Lahaina Virtual VR',
    url: 'https://trustedops2020.maps.arcgis.com/apps/360vr/index.html?id=7edd4db500e14034957b77a325912852',
  },
  {
    title: 'Lahaiana Fire Imaginery',
    url: 'https://storms.ngs.noaa.gov/storms/2023_hawaii/index.html#16.29/20.882298/-156.68318/69.7/40',
  },
];

const Mapping = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const changePage = (newPage) => {
    setIsLoading(true);
    setCurrentPage(newPage);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleNext = () => {
    changePage((currentPage + 1) % mapsData.length);
  };

  const handlePrevious = () => {
    changePage((currentPage - 1 + mapsData.length) % mapsData.length);
  };

  return (
    <div className="p-3" style={{ width: '100%', height: '750px' }}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Row className="justify-content-center mt-3">
            <Col xs={12} md={6} className="d-flex justify-content-around">
              <Button style={{ background: 'white', color: 'black' }} onClick={handlePrevious}>Previous</Button>
              <h2 className="text-center">{mapsData[currentPage].title}</h2>
              <Button style={{ background: 'white', color: 'black' }} onClick={handleNext}>Next</Button>
            </Col>
          </Row>
          <p className="text-center"><Nav.Link href={mapsData[currentPage].url}>Link (Click To Redirect)</Nav.Link></p>
          {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
          <iframe
            src={mapsData[currentPage].url}
            width="100%"
            height="85%"
            frameBorder="0"
            allowFullScreen
            className="mt-3"
          />
        </>
      )}
    </div>
  );
};

export default Mapping;
