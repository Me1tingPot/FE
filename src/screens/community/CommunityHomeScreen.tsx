import {SafeAreaView, StyleSheet, Text} from 'react-native';

interface CommunityHomeScreenProps {}

const CommunityHomeScreen = ({}: CommunityHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>CommunityHomeScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CommunityHomeScreen;
