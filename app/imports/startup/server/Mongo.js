import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/profile';
import { Posts } from '../../api/post/post';
import { Comments } from '../../api/comment/comment';
import { Surveys } from '../../api/survey/survey';
import { Votes } from '../../api/vote/vote';

const addProfile = (profile) => {
  console.log(`  Adding: ${profile.firstName} (${profile.owner})`);
  Profiles.collection.insert(profile);
};

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.forEach(data => addProfile(data));
  }
}

const addPost = (post) => {
  console.log(`  Adding: ${post.title} (${post.owner})`);
  Posts.collection.insert(post);
};

if (Posts.collection.find().count() === 0) {
  if (Meteor.settings.defaultPosts) {
    console.log('Creating default posts.');
    Meteor.settings.defaultPosts.forEach(data => addPost(data));
  }
}

const addSurvey = (survey) => {
  console.log(`  Adding: ${survey.owner}`);
  Surveys.collection.insert(survey);
};

if (Surveys.collection.find().count() === 0) {
  if (Meteor.settings.defaultSurveys) {
    console.log('Creating default surveys.');
    Meteor.settings.defaultSurveys.forEach(data => addSurvey(data));
  }
}

const addVote = (vote) => {
  console.log(`  Adding: ${vote.owner}`);
  Votes.collection.insert(vote);
};

if (Votes.collection.find().count() === 0) {
  if (Meteor.settings.defaultVotes) {
    console.log('Creating default votes.');
    Meteor.settings.defaultVotes.forEach(data => addVote(data));
  }
}

const addComment = (comment) => {
  console.log(`  Adding: ${comment.owner}`);
  Comments.collection.insert(comment);
};

if (Comments.collection.find().count() === 0) {
  if (Meteor.settings.defaultComments) {
    console.log('Creating default comments.');
    Meteor.settings.defaultComments.forEach(data => addComment(data));
  }
}
