import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class CommentsCollection {
  constructor() {
    this.name = 'CommentsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      comment: String,
      image: { type: String, optional: true },
      createdAt: Date,
      owner: String,
      postId: String,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const Comments = new CommentsCollection();
