import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Image, ListGroup } from 'react-bootstrap';
import AddComment from './AddComment';
import Comment from './Comment';

const Post = ({ post, comments, eventKey }) => (
  <Accordion.Item eventKey={eventKey}>
    <Accordion.Header>{post.title}</Accordion.Header>
    <Accordion.Body>
      <p>{post.owner} @ {post.createdAt.toLocaleDateString('en-US')}</p>
      {post.image && <Image src={post.image} width={300} />}
      <p className="p-1">{post.contents}</p>
      <ListGroup variant="flush">
        {comments.map((comment, index) => <Comment key={index} comment={comment} />)}
      </ListGroup>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add Comment</Accordion.Header>
          <Accordion.Body>
            <AddComment postId={post._id} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Accordion.Body>
  </Accordion.Item>
);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    contents: PropTypes.string,
    image: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  eventKey: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    note: PropTypes.string,
    contactID: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    owner: PropTypes.string,
    _id: PropTypes.string,
  })).isRequired,
};

export default Post;
