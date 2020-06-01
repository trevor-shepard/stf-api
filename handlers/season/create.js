'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('../../config/fbConfig.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const Controller = require('../../controllers/seasons-controller');

export const create = async event => {
	try {
		const uid = event.requestContext.authorizer.uid;

		const controller = new Controller(admin);

		const body = JSON.parse(event.body);

		const season = controller.create(body, uid);

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({
				...season
			})
		};
	} catch (error) {
		return {
			statusCode: 400,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({
				error
			})
		};
	}
};
