'use strict';

const { getStorms } = require('../services/storm.service');
const { SuccesResponse } = require('../core/success.response');

class StormController {
  getStormList = async (req, res, next) => {
    new SuccesResponse({
      message: 'Get storm by city name successfully',
      metadata: await getStorms(req.query),
    }).send(res);
  };
}

module.exports = new StormController();
