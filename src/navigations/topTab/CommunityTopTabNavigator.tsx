import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors, communityNavigations } from '@/constants';
import CommunityPostingScreen from '@/screens/community/CommunityPostingScreen';
import CommunityQuestionScreen from '@/screens/community/CommunityQuestionScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

export type CommunityTabParamList = {
	[communityNavigations.COMMUNITY_POSTING]: undefined;
	[communityNavigations.COMMUNITY_QUESTION]: undefined;
};

const Tab = createMaterialTopTabNavigator<CommunityTabParamList>();

function CommunityTopTabNavigator() {
	const { theme } = useThemeStore();
	const { t } = useTranslation();
	const styles = styling(theme);

	return (
		<SafeAreaView style={styles.safeView}>
			<Tab.Navigator
				screenOptions={{
					tabBarLabelStyle: {
						fontSize: 20,
						fontFamily: 'Pretendard-Light',
					},
					tabBarInactiveTintColor: colors[theme].GRAY_500,
					tabBarActiveTintColor: colors[theme].BLACK,
					tabBarStyle: {
						backgroundColor: colors[theme].WHITE,
					},
					tabBarIndicatorStyle: {
						backgroundColor: colors[theme].EMERALD_500,
					},
				}}
			>
				<Tab.Screen
					name={communityNavigations.COMMUNITY_POSTING}
					component={CommunityQuestionScreen}
					options={{
						tabBarLabel: `${t('질문')}`,
					}}
				/>
				<Tab.Screen
					name={communityNavigations.COMMUNITY_QUESTION}
					component={CommunityPostingScreen}
					options={{
						tabBarLabel: `${t('포스팅')}`,
					}}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		safeView: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
	});

export default CommunityTopTabNavigator;
