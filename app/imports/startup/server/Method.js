import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'you-own-key',
  api_key: 'you-own-key',
  api_secret: 'you-own-key',
});

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
  async generateImage(prompt) {
    try {
      const response = await HTTP.call('POST', 'https://api.openai.com/v1/images/generations', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${'you-own-key'}`,
        },
        data: {
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
        },
      });

      const imageUrl = response.data.data[0].url;
      return imageUrl;
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      throw new Meteor.Error('api-call-failed', `Failed to call OpenAI API: ${error.message}`);
    }
  },

  // eslint-disable-next-line meteor/audit-argument-checks
  async uploadImage(imageData) {
    this.unblock();

    try {
      const result = await cloudinary.v2.uploader.upload(imageData, { resource_type: 'auto' });
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Meteor.Error('cloudinary-upload-failed', 'Error uploading to Cloudinary');
    }
  },

});
