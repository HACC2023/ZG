import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, InfoWindow, StandaloneSearchBox } from '@react-google-maps/api';
import { Row, Col, Accordion, Pagination, Nav } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { ModCards } from '../../api/modcard/modcard';
import ModCard from '../components/ModCard';
import LoadingSpinner from '../components/LoadingSpinner';

const containerStyle = {
  width: '100%',
  height: '925px',
};

const center = {
  lat: 20.8783,
  lng: -156.6825,
};

const Model = () => {
  const [mapOptions] = useState({
    center: center,
    zoom: 16,
    mapTypeId: 'satellite',
    tilt: 0,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState('');
  const [locationPhotoUrl, setLocationPhotoUrl] = useState('');
  const [activeAccordionKey, setActiveAccordionKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMapScriptLoaded, setIsMapScriptLoaded] = useState(false);
  const modCardsPerPage = 2;
  const navigate = useNavigate();
  const searchBoxRef = useRef(null);

  const handleImageClick = (imageUrl) => {
    setLocationPhotoUrl(imageUrl);
  };

  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setInfoWindowPosition({ lat, lng });
    setLocationPhotoUrl('');

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setFormattedAddress(results[0].formatted_address);
        setSelectedPlace({ lat, lng });
      }
    });
  };

  const onLoadSearchBox = (ref) => {
    searchBoxRef.current = ref;
  };

  const navigateToAddModCard = () => {
    navigate('/addmodcard', { state: { formattedAddress } });
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const latLng = place.geometry.location;
      const lat = latLng.lat();
      const lng = latLng.lng();
      setInfoWindowPosition({ lat, lng });
      setLocationPhotoUrl('');
      setSelectedPlace({ lat, lng });
      setFormattedAddress(place.formatted_address || '');
      onMapClick({ latLng: new window.google.maps.LatLng(lat, lng) });
    }
  };

  const photoUrlToShow = locationPhotoUrl || '/images/example-photo.png';

  const handleAccordionToggle = (key) => setActiveAccordionKey(activeAccordionKey === key ? null : key);

  const { ready, modcards } = useTracker(() => {
    const subscription = Meteor.subscribe(ModCards.userPublicationName);
    const allModCards = ModCards.collection.find({}).fetch();
    const filteredModCards = allModCards.filter(modCard => modCard.address === formattedAddress);

    return {
      modcards: filteredModCards,
      ready: subscription.ready(),
    };
  }, [formattedAddress]);

  const indexOfLastModCard = currentPage * modCardsPerPage;
  const indexOfFirstModCard = indexOfLastModCard - modCardsPerPage;
  const currentModCards = modcards.slice(indexOfFirstModCard, indexOfLastModCard);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return ready ? (
    <Row>
      <Col md={4} style={{ height: '350px' }}>
        <div className="p-1" style={{ height: '100%' }}>
          <img src={photoUrlToShow} alt="Location" style={{ width: '105%', height: '105%', objectFit: 'cover' }} />
        </div>
        <Accordion className="p-3" activeKey={activeAccordionKey}>
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={() => handleAccordionToggle('0')}>Information</Accordion.Header>
            <Accordion.Body>
              <p>Address: {formattedAddress}</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header onClick={() => handleAccordionToggle('1')}>User Modeling</Accordion.Header>
            <Accordion.Body>
              <Row className="mt-3">
                {currentModCards.map((modcard) => (
                  <ModCard key={modcard._id} modCard={modcard} onImageClick={handleImageClick} />
                ))}
              </Row>
              <div className="d-flex justify-content-center p-3">
                <Pagination>
                  {Array.from({ length: Math.ceil(modcards.length / modCardsPerPage) }, (_, i) => (
                    <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                      {i + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
              {formattedAddress && (
                <div className="d-flex justify-content-end">
                  <Nav.Link onClick={navigateToAddModCard} style={{ textDecoration: 'none' }}>
                    <PlusCircleFill style={{ fontSize: '2rem', color: 'black' }} />
                  </Nav.Link>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
      <Col md={8}>
        <LoadScript
          googleMapsApiKey="Your Key"
          libraries={['places']}
          onLoad={() => setIsMapScriptLoaded(true)}
        >
          {isMapScriptLoaded && (
            <div className="search-box-container"> {/* Search box container */}
              <StandaloneSearchBox onLoad={onLoadSearchBox} onPlacesChanged={onPlacesChanged}>
                {/* eslint-disable-next-line max-len */}
                <input type="text" placeholder="Search for places" style={{ boxSizing: 'border-box', border: '1px solid transparent', width: '100%', height: '32px', padding: '0 12px', borderRadius: '3px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', fontSize: '14px', outline: 'none', textOverflow: 'ellipses' }} />
              </StandaloneSearchBox>
            </div>
          )}
          <GoogleMap
            mapContainerStyle={containerStyle}
            options={mapOptions}
            onClick={onMapClick}
          >
            {selectedPlace && (
              <InfoWindow
                position={infoWindowPosition}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <h4>Address</h4>
                  <p>{formattedAddress}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </Col>
    </Row>
  ) : <LoadingSpinner />;
};

export default Model;
