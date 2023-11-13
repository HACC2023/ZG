import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField, HiddenField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Posts } from '../../api/post/post';
import FileField from '../components/FileField';

const bridge = new SimpleSchema2Bridge(Posts.schema);

const AddPost = () => {
  const [imageFile, setImageFile] = useState(null);
  let fRef = null;
  const user = Meteor.user();

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const submit = (data) => {
    const { image, ...postData } = data;
    postData.createdAt = new Date();
    postData.owner = user ? user.username : 'Anonymous';

    // eslint-disable-next-line no-shadow
    const insertPost = (postData) => {
      Posts.collection.insert(postData, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Post added successfully', 'success');
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
            postData.image = imageUrl;
            insertPost(postData);
          }
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      insertPost(postData);
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={6}>
          <Col className="text-center"><h2>Add Post</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={submit}>
            <Card>
              <Card.Body>
                <TextField name="title" />
                <div className="mb-3">
                  <FileField name="image" onChange={handleImageChange} />
                </div>
                <LongTextField name="contents" />
                <ErrorsField />
                <SubmitField value="Submit" />
                <HiddenField name="createdAt" value={new Date()} />
                {user ? <HiddenField name="owner" value={user.username} /> : null}
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPost;
