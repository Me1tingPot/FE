import { StyleSheet } from 'react-native';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import FeedTabNavigator from '../tab/FeedTabNavigator';

// 사용자가 가장 먼저 마주하게 되는 로직 작성.

interface RootNavigatorProps {}

function RootNavigator({}: RootNavigatorProps) {
	const isLoggedIn = false;
	return <>{isLoggedIn ? <FeedTabNavigator /> : <AuthStackNavigator />}</>;
}

const styles = StyleSheet.create({});

export default RootNavigator;
