'use strict';

const admin = require('firebase-admin');
const serviceAccount = require('../config/fbConfig.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

module.exports.verifyAuth = async (event, context, callback) => {
	try {
		if (typeof event.authorizationToken === 'undefined') {
			if (process.env.DEBUG === 'true') {
				console.log('AUTH: No token');
			}

			callback('Unauthorized');
		}

		const split = event.authorizationToken.split('Bearer');
		if (split.length !== 2) {
			if (process.env.DEBUG === 'true') {
				console.log('AUTH: no token in Bearer');
			}

			callback('Unauthorized');
		}

		const idToken = split[1].trim();

		const decodedToken = await admin.auth().verifyIdToken(idToken);
		const uid = decodedToken.uid;
		callback(null, generatePolicy(uid, 'Allow', event.methodArn));
	} catch (error) {
		if (error.code === 'auth/id-token-revoked') {
			callback(null, generatePolicy('Unauthorized', 'Deny', event.methodArn));
		}
	}
};

const generatePolicy = (principalId, effect, resource) => {
	const authResponse = {};

	authResponse.principalId = principalId;
	if (effect && resource) {
		const policyDocument = {};
		policyDocument.Version = '2012-10-17';
		policyDocument.Statement = [];
		const statementOne = {};
		statementOne.Action = 'execute-api:Invoke';
		statementOne.Effect = effect;
		statementOne.Resource = resource;
		policyDocument.Statement[0] = statementOne;
		authResponse.policyDocument = policyDocument;
	}

	console.log('policy created:', authResponse);
	// Optional output with custom properties of the String, Number or Boolean type.

	authResponse.context = {
		uid: principalId
	};
	return authResponse;
};
