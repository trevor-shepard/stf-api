const admin = require('firebase-admin');
const serviceAccount = require('../../config/fbConfig.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const Controller = require('../../controllers/users');

export const create = async event => {
	try {
		console.log('11');
		const controller = new Controller(admin);

		console.log('14');

		const profile = await controller.create({username: 'hi', email: `lester${Math.floor(Math.random() * 800) + 1}@doogal.com`}, '123456');

		console.log('18');

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
				message: 'oh big boy error',
				error
			})
		};
	}
};
