import React, { useState } from 'react';
import { Button, Card, Col, ListGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ModCard = ({ modCard, onImageClick }) => {
  const [show, setShow] = useState(false);
  const detailLengthLimit = 55;

  const renderPopover = (
    <Popover id="popover-basic">
      <Popover.Body>
        {modCard.detail}
      </Popover.Body>
    </Popover>
  );

  const detailDisplay = modCard.detail.length > detailLengthLimit
    ? `${modCard.detail.substring(0, detailLengthLimit)}...`
    : modCard.detail;

  return (
    <Col>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title style={{ fontSize: '1.1rem' }}>{modCard.type}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Cost: {modCard.cost}</ListGroup.Item>
          {modCard.image && (
            <Button style={{ background: 'white', color: 'black' }} onClick={() => onImageClick(modCard.image)}>
              Show Image
            </Button>
          )}
          <ListGroup.Item>
            Details: { /* space */}
            {modCard.detail.length > detailLengthLimit ? (
              <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="right"
                overlay={renderPopover}
                show={show}
                onToggle={(nextShow) => setShow(nextShow)}
              >
                <span style={{ cursor: 'pointer' }}>
                  {detailDisplay}
                </span>
              </OverlayTrigger>
            ) : (
              detailDisplay
            )}
            <p className="p-2" style={{ fontSize: '0.6rem', color: '#6c757d' }}>
              {modCard.owner} @ {modCard.createdAt.toLocaleDateString('en-US')}
            </p>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

ModCard.propTypes = {
  modCard: PropTypes.shape({
    type: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    image: PropTypes.string,
    detail: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    owner: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ModCard;
