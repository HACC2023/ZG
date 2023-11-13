import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Comments } from '../../api/comment/comment';
import FileField from './FileField';

const bridge = new SimpleSchema2Bridge(Comments.schema);

const AddComment = ({ postId }) => {
  const [imageFile, setImageFile] = useState(null);
  let fRef = null;
  const user = Meteor.user();

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const submit = (data) => {
    const commentData = {
      ...data,
      createdAt: new Date(),
      postId: postId,
      owner: user ? user.username : 'Anonymous',
    };

    // eslint-disable-next-line no-shadow
    const insertComment = (commentData) => {
      Comments.collection.insert(commentData, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Comment added successfully', 'success');
          fRef.reset();
        }
      });
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = function () {
        const fileData = reader.result;

        Meteor.call('uploadImage', fileData, (error, imageUrl) => {
          if (error) {
            swal('Error', 'Failed to upload image.', 'error');
          } else {
            commentData.image = imageUrl;
            insertComment(commentData);
          }
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      insertComment(commentData);
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={submit}>
            <Card>
              <Card.Body>
                <div className="mb-3">
                  <FileField name="image" onChange={handleImageChange} />
                </div>
                <LongTextField name="comment" />
                <ErrorsField />
                <SubmitField value="Submit" />
                <HiddenField name="createdAt" value={new Date()} />
                <HiddenField name="postId" value={postId} />
                {user ? <HiddenField name="owner" value={user.username} /> : null}
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddComment.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default AddComment;
