'use strict';

const express = require('express');
const subscriberController = require('../../controllers/subscriber.controller');

const router = express.Router();

router.get('/', subscriberController.getSubscriberPage);

module.exports = router;
