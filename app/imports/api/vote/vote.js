import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

class VotesCollection {
  constructor() {
    this.name = 'VotesCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      option1: Boolean,
      owner: String,
      surveyId: String,
      uniqueId: String,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    if (Meteor.isServer) {
      Meteor.startup(() => {
        this.collection.rawCollection().createIndex({ uniqueId: 1 }, { unique: true });
      });
    }
  }
}

export const Votes = new VotesCollection();
