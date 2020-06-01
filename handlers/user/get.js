'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('../../config/fbConfig.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const Controller = require('../../controllers/users-controller');

export const get = async event => {
	try {
		const uid = event.requestContext.authorizer.uid;

		const controller = new Controller(admin);

		const profile = await controller.get(uid);

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({
				...profile
			})
		};
	} catch (error) {
		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			statusCode: 400,
			body: JSON.stringify({
				error
			})
		};
	}
};
