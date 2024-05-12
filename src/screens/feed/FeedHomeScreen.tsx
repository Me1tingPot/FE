import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Config from 'react-native-config';

console.log('환경변수 테스트', Config.TEST);

interface FeedHomeScreenProps {}

const FeedHomeScreen = ({}: FeedHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>FeedHomeScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
