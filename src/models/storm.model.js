'use strict';

const { model, Schema, Types } = require('mongoose');

const DOCUMENT_NAME = 'Storm';
const COLLECTION_NAME = 'Storms';

const stormSchema = new Schema(
  {
    cityName: { type: String, required: true },
    affectedAreas: { type: Number, required: true },
    detectedTime: { type: Date, required: true },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    collection: COLLECTION_NAME,
    timestamps: {
      createdAt: 'createdOn',
      updatedAt: 'modifiedOn',
    },
  }
);

module.exports = model(DOCUMENT_NAME, stormSchema);
