import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';
import { Posts } from '../../api/post/post';
import { Comments } from '../../api/comment/comment';
import { Surveys } from '../../api/survey/survey';
import { Votes } from '../../api/vote/vote';
import { ModCards } from '../../api/modcard/modcard';

Meteor.publish(Comments.userPublicationName, function () {
  if (this.userId) {
    return Comments.collection.find();
  }
  return this.ready();
});
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Posts.userPublicationName, function () {
  if (this.userId) {
    return Posts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Votes.userPublicationName, function () {
  if (this.userId) {
    return Votes.collection.find();
  }
  return this.ready();
});

Meteor.publish(ModCards.userPublicationName, function () {
  if (this.userId) {
    return ModCards.collection.find();
  }
  return this.ready();
});

Meteor.publish(Surveys.userPublicationName, function () {
  if (this.userId) {
    return Surveys.collection.find();
  }
  return this.ready();
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
