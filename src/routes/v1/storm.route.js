'use strict';

const express = require('express');
const stormController = require('../../controllers/storm.controller');
const asyncHandler = require('../../helpers/asyncHandle');
const validate = require('../../middlewares/validate');
const stormValidation = require('../../validations/storm.validation');

const router = express.Router();

router.get('/', validate(stormValidation.getStorms), asyncHandler(stormController.getStormList));

module.exports = router;
