'use strict';
const admin = require('firebase-admin');
const serviceAccount = require('../../config/fbConfig.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const Controller = require('../../controllers/users');

export const create = async event => {
	try {
		const body = JSON.parse(event.body);
		const {username, password, email} = body;
		console.log('event body', body);

		const controller = new Controller(admin);

		const profile = await controller.create({username, email}, password);

		return {
			statusCode: 200,
			body: JSON.stringify({
				...profile
			})
		};
	} catch (error) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				error
			})
		};
	}
};
