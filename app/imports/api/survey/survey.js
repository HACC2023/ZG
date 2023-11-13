import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class SurveysCollection {
  constructor() {
    this.name = 'SurveysCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      contents: String,
      createdAt: Date,
      option1: String,
      option2: String,
      owner: String,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const Surveys = new SurveysCollection();
