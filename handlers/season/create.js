'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('../../config/fbConfig.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const Controller = require('../../controllers/seasons-controller');
const createResponse = require('../../utils/response-constructor');

export const create = async (event) => {
  try {
    console.log('season create start');
    const uid = event.requestContext.authorizer.uid;

    const controller = new Controller(admin);

    const body = JSON.parse(event.body);

    const season = await controller.create(body, uid);

    return createResponse(200, season);
  } catch (error) {
    return createResponse(400, error);
  }
};
