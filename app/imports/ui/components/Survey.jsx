import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button, Carousel, Col, ProgressBar } from 'react-bootstrap';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { Votes } from '../../api/vote/vote';
import LoadingSpinner from './LoadingSpinner';

const Survey = ({ survey }) => {
  const submitVote = (option1Value, owner, surveyId, uniqueId) => {
    Votes.collection.insert(
      { option1: option1Value, owner, surveyId, uniqueId },
      (error) => {
        if (error) {
          swal('Error', 'A vote already exists for this user', 'error');
        } else {
          swal('Success', 'Vote added successfully', 'success');
        }
      },
    );
  };

  const { ready, option1Percentage, option2Percentage } = useTracker(() => {
    const subscription = Meteor.subscribe(Votes.userPublicationName);
    const rdy = subscription.ready();
    const voteItems = Votes.collection.find({ surveyId: survey._id }).fetch();
    const totalVotes = voteItems.length;
    const option1Votes = voteItems.filter(vote => vote.option1).length;
    const option1Pct = totalVotes > 0 ? (option1Votes / totalVotes) * 100 : 0;
    const option2Pct = totalVotes > 0 ? 100 - option1Pct : 0;
    return {
      option1Percentage: option1Pct,
      option2Percentage: option2Pct,
      ready: rdy,
    };
  }, [survey._id]);

  return ready ? (
    <Carousel.Caption>
      <h3>{survey.contents}</h3>
      <h5 className="p-3">{survey.owner} @ {new Date(survey.createdAt).toLocaleString()}</h5>
      <ProgressBar>
        <ProgressBar style={{ backgroundColor: 'white', color: 'black' }} now={option1Percentage} label={`${option1Percentage.toFixed(1)}%`} key={1} />
        <ProgressBar now={option2Percentage} label={`${option2Percentage.toFixed(1)}%`} key={2} />
      </ProgressBar>
      <br />
      <Col className="p-3">
        <Button
          variant="primary"
          size="lg"
          style={{
            backgroundColor: 'white',
            color: 'black',
            width: '125px',
            height: '50px',
          }}
          onClick={() => submitVote(true, Meteor.user().username, survey._id, `${survey._id}+${Meteor.user().username}`)}
        >
          {survey.option1}
        </Button>{' '}
        <Button
          variant="primary"
          size="lg"
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '125px',
            height: '50px',
          }}
          onClick={() => submitVote(false, Meteor.user().username, survey._id, `${survey._id}+${Meteor.user().username}`)}
        >
          {survey.option2}
        </Button>{' '}
      </Col>
    </Carousel.Caption>
  ) : <LoadingSpinner />;
};

Survey.propTypes = {
  survey: PropTypes.shape({
    contents: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    option1: PropTypes.string,
    option2: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Survey;
