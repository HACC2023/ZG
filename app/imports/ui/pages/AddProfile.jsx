import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profiles } from '../../api/profile/profile';
import FileField from '../components/FileField';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

const AddProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  let fRef = null;
  const user = Meteor.user();

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const submit = (data) => {
    const { image, ...profileData } = data;

    // eslint-disable-next-line no-shadow
    const insertProfile = (profileData) => {
      Profiles.collection.insert(profileData, (error) => {
        if (error) {
          swal('Error', 'A profile already exists for this user', 'error');
        } else {
          swal('Success', 'Profile added successfully', 'success');
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
            console.error('Image upload error:', error);
            swal('Error', 'Failed to upload image.', 'error');
          } else {
            profileData.image = imageUrl;
            insertProfile(profileData);
          }
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      insertProfile(profileData);
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="firstName" />
                <TextField name="lastName" />
                <TextField name="location" />
                <div className="mb-3">
                  <FileField name="image" onChange={handleImageChange} />
                </div>
                <LongTextField name="bio" />
                <ErrorsField />
                <SubmitField value="Submit" />
                {user ? <HiddenField name="owner" value={user.username} /> : null}
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProfile;
