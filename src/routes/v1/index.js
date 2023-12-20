const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const subscriberRoute = require('./subscriber.route');
const publisherRoute = require('./publisher.route');
const stormRoute = require('./storm.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/subscriber',
    route: subscriberRoute,
  },
  {
    path: '/publisher',
    route: publisherRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },

  {
    path: '/storms',
    route: stormRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
