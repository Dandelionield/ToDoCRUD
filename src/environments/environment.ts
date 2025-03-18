
export const environment = {

	production: false,
	firebase: {

		credentials: {

			apiKey: "AIzaSyBNioLJ-yKGtGx_RIUgCtmCfwmjWYjSluo",
			authDomain: "todocrud-firebase.firebaseapp.com",
			projectId: "todocrud-firebase",
			storageBucket: "todocrud-firebase.firebasestorage.app",
			messagingSenderId: "698497478334",
			appId: "1:698497478334:web:5ac478bf0358f7c726b8ef"

		}, collections: {

			task: {

				name: 'task',
				idField: 'id'

			}

		}

	}

};
