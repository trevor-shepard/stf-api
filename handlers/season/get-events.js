'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('../../config/fbConfig.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const Controller = require('../../controllers/seasons-controller');
const createResponse = require('../../utils/response-constructor');
const {InsufficentDataError} = require('../../utils/errors');

export const getEvents = async (event) => {
  try {
    const id = event.pathParameters.id;
    if (!id) throw new InsufficentDataError('missing id param');
    const controller = new Controller(admin);
    const season = await controller.getEvents(id);
    return createResponse(200, season);
  } catch (error) {
    return createResponse(400, error);
  }
};
