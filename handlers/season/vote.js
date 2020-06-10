'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('../../config/fbConfig.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const Controller = require('../../controllers/seasons-controller');
const createResponse = require('../../utils/response-constructor');
const {InsufficentDataError} = require('../../utils/errors');

export const vote = async (event) => {
  try {
    const uid = event.requestContext.authorizer.uid;
    const id = event.pathParameters.id;
    if (!id) throw new InsufficentDataError('missing id param');

    const controller = new Controller(admin);

    const {activity, value} = JSON.parse(event.body);

    const season = await controller.vote(id, uid, activity, value);

    return createResponse(200, season);
  } catch (error) {
    return createResponse(400, error);
  }
};
