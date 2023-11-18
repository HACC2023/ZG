import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class ModCardsCollection {
  constructor() {
    this.name = 'ModCardsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      type: String,
      image: { type: String, optional: true },
      cost: String,
      detail: String,
      address: String,
      createdAt: Date,
      owner: String,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const ModCards = new ModCardsCollection();
