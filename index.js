/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import '@/locales/i18n.config';

AppRegistry.registerComponent(appName, () => App);
