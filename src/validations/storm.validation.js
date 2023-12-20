const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getStorms = {
  query: Joi.object().keys({
    cityName: Joi.string().required(),
    sortBy: Joi.string().valid('detectedTime'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  getStorms,
};
