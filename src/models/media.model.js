'use strict';

const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Media';
const COLLECTION_NAME = 'Medias';

const mediaSchema = new Schema(
  {
    mediaType: { type: String, enum: ['image', 'video'], required: true },
    mediaURL: { type: String, required: true },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: {
      createdAt: 'createdOn',
      updatedAt: 'modifiedOn',
    },
  }
);

module.exports = model(DOCUMENT_NAME, mediaSchema);
