import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors, communityNavigations } from '@/constants';
import CommunityPostingScreen from '@/screens/community/CommunityPostingScreen';
import CommunityQuestionScreen from '@/screens/community/CommunityQuestionScreen';
import useThemeStore from '@/store/useThemeStore';

export type CommunityTabParamList = {
	[communityNavigations.COMMUNITY_POSTING]: undefined;
	[communityNavigations.COMMUNITY_QUESTION]: undefined;
};

const Tab = createMaterialTopTabNavigator<CommunityTabParamList>();

function CommunityTopTabNavigator() {
	const { theme } = useThemeStore();
	const { t } = useTranslation();
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Tab.Navigator
				screenOptions={{
					tabBarLabelStyle: {
						fontSize: 20,
						fontFamily: 'Pretendard-Bold',
					},
					tabBarInactiveTintColor: colors[theme].GRAY_500,
					tabBarActiveTintColor: colors[theme].PINK_700,
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
					component={CommunityPostingScreen}
					options={{
						tabBarLabel: `${t('질문')}`,
					}}
				/>
				<Tab.Screen
					name={communityNavigations.COMMUNITY_QUESTION}
					component={CommunityQuestionScreen}
					options={{
						tabBarLabel: `${t('포스팅')}`,
					}}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	);
}

export default CommunityTopTabNavigator;