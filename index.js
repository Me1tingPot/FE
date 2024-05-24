/**
 * @format
 */
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import '@/locales/i18n.config';
import { name as appName } from './app.json';

async function enableMocking() {
	await import('./msw.polyfills');
	const { server } = await import('./src/mocks/server/');
	server.listen();
}

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
