import {StyleSheet} from 'react-native';
import FeedTabNavigator from '../tab/FeedTabNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';

// 사용자가 가장 먼저 마주하게 되는 로직 작성.

interface RootNavigatorProps {}

const RootNavigator = ({}: RootNavigatorProps) => {
  const isLoggedIn = true;
  return <>{isLoggedIn ? <FeedTabNavigator /> : <AuthStackNavigator />}</>;
};

const styles = StyleSheet.create({});

export default RootNavigator;
