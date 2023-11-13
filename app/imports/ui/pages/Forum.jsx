import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Accordion, Col, Row, Nav, Form, Pagination } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PlusCircleFill } from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { Posts } from '../../api/post/post';
import { Comments } from '../../api/comment/comment';
import Post from '../components/Post';

const Forum = () => {
  const postsPerPage = 10;
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMyPosts, setViewMyPosts] = useState(false);

  const { posts, comments, ready } = useTracker(() => {
    const postSubscription = Meteor.subscribe(Posts.userPublicationName);
    const commentSubscription = Meteor.subscribe(Comments.userPublicationName);
    const rdy = postSubscription.ready() && commentSubscription.ready();
    const postItems = Posts.collection.find({}).fetch();
    const commentItems = Comments.collection.find({}).fetch();
    return {
      posts: postItems,
      comments: commentItems,
      ready: rdy,
    };
  }, []);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  let filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (viewMyPosts) {
    filteredPosts = filteredPosts.filter(post => post.owner === Meteor.user().username);
  }

  const startIndex = (activePage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    ready ? (
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <h2 className="text-center p-3">Tools</h2>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link
                className="p-3"
                style={{ color: 'black' }}
                onClick={() => setViewMyPosts(!viewMyPosts)} // Toggle the view
              >
                My Posts
              </Nav.Link>
              <Nav.Link style={{ color: 'black' }} href="/dalle3">Generate Image</Nav.Link>
              <Nav.Link className="p-3" href="/addpost">
                <PlusCircleFill style={{ fontSize: '2rem', color: 'black' }} />
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={9}>
            <h1 className="text-center p-3">Forum</h1>
            <Form className="mb-3" onSubmit={handleSearchSubmit}>
              <Form.Group controlId="searchBar">
                <Row>
                  <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
                </Row>
              </Form.Group>
            </Form>
            <Accordion>
              {paginatedPosts.map((post, index) => {
                const postComments = comments.filter(comment => comment.postId === post._id);
                return <Post key={post._id} post={post} comments={postComments} eventKey={index.toString()} />;
              })}
            </Accordion>
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
    ) : <LoadingSpinner />
  );
};

export default Forum;
