import {useTranslation} from 'react-i18next';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

interface MyHomeScreenProps {}

const MyHomeScreen = ({}: MyHomeScreenProps) => {
  const {t, i18n} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Text>MyHomeScreen</Text>
      <Text>{t(`bottomTab.home`)}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyHomeScreen;
