import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/profile';
import FileField from '../components/FileField';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

const EditProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  let fRef = null;

  const handleImageChange = (file) => {
    setImageFile(file);
  };

  const profile = Profiles.collection.findOne({ owner: Meteor.user()?.username });
  const _id = profile?._id;

  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const document = Profiles.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = (data) => {
    const { firstName, lastName, location, bio } = data;
    const profileData = { firstName, lastName, location, bio };

    // eslint-disable-next-line no-shadow
    const updateProfile = (profileData) => {
      Profiles.collection.update(_id, { $set: profileData }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile updated successfully', 'success');
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
            updateProfile(profileData);
          }
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      updateProfile(profileData);
    }
  };

  const deleteProfile = () => {
    swal({
      title: 'Profile Delete',
      text: 'Once deleted, you will not be able to recover this profile!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          Profiles.collection.remove(_id, (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Profile deleted successfully', 'success')));
        }
      });
  };

  return (
    <Container className="py-3">
      {ready ? (
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center"><h2>Edit Profile</h2></Col>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)} model={doc}>
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
                  <SubmitField value="Submit" className="me-2" />
                  <HiddenField name="owner" value={Meteor.user()?.username} />
                </Card.Body>
              </Card>
            </AutoForm>
            <div className="mt-2 text-center">
              <Button variant="danger" onClick={deleteProfile}>Delete Profile</Button>
            </div>
          </Col>
        </Row>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default EditProfile;
