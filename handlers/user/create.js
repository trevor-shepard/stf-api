'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('../../config/fbConfig.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const Controller = require('../../controllers/users-controller');
const createResponse = require('../../utils/response-constructor');

export const create = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const {username, password, email} = body;
    const controller = new Controller(admin);

    const profile = await controller.create({username, email}, password);
    const response = createResponse(200, profile);
    return response;
  } catch (error) {
    const response = createResponse(400, error);
    return response;
  }
};
