import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'react-bootstrap';

const Profile = ({ profile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxTextLength = 100;
  const handleToggle = () => setIsExpanded(!isExpanded);

  const truncateText = (text) => {
    if (text.length > maxTextLength) {
      return `${text.substring(0, maxTextLength)}...`;
    }
    return text;
  };
  const textContainerStyle = {
    minHeight: '100px',
  };
  return (
    <Card className="h-100">
      <Card.Header>
        <Image src={profile.image} width={75} />
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
        <Card.Subtitle>{profile.location}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text style={textContainerStyle}>
          {isExpanded ? profile.bio : truncateText(profile.bio)}
        </Card.Text>
        {profile.bio.length > maxTextLength && (
          <Button onClick={handleToggle} variant="link" style={{ color: 'black' }}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

Profile.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default Profile;
