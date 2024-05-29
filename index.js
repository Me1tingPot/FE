/**
 * @format
 */
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import '@/locales/i18n.config';
import { name as appName } from './app.json';

async function enableMocking() {
	await import('./msw.polyfills');
	const { server } = await import('./src/mocks/server/');
	server.listen({
		onUnhandledRequest() {
			console.trace('Here');
		},
	});
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
	console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerRunnable(appName, async initialProps => {
	try {
		await enableMocking();
		const App = require('./App').default;
		AppRegistry.registerComponent(appName, () => App);
		AppRegistry.runApplication(appName, initialProps);
	} catch (err) {
		console.log(err);
	}
});
