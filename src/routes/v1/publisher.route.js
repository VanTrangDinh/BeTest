'use strict';

const express = require('express');
const publisherController = require('../../controllers/publisher.controller');

const router = express.Router();

router.post('/', publisherController.publishMQTTMessage).get('/', publisherController.getPublisherPage);

module.exports = router;
