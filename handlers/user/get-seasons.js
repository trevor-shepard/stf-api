'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('../../config/fbConfig.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const Controller = require('../../controllers/users-controller');
const createResponse = require('../../utils/response-constructor');

export const getSeasons = async (event) => {
  try {
    const uid = event.requestContext.authorizer.uid;

    const controller = new Controller(admin);

    const profile = await controller.getSeasons(uid);

    return createResponse(200, profile);
  } catch (error) {
    return createResponse(400, error);
  }
};
