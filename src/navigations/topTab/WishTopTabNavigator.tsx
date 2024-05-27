import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors, wishNavigations } from '@/constants';
import WishReservationScreen from '@/screens/wish/WishReservationScreen';
import WishSaveScreen from '@/screens/wish/WishSaveScreen';
import useThemeStore from '@/store/useThemeStore';

export type PartyTabParamList = {
	[wishNavigations.WISH_SAVE]: undefined;
	[wishNavigations.WISH_RESERVATION]: undefined;
};

const Tab = createMaterialTopTabNavigator();

function WishTopTabNavigator() {
	const { t } = useTranslation();
	const { theme } = useThemeStore();

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
					name={wishNavigations.WISH_SAVE}
					component={WishSaveScreen}
					options={{
						tabBarLabel: `${t('저장')}`,
					}}
				/>
				<Tab.Screen
					name={wishNavigations.WISH_RESERVATION}
					component={WishReservationScreen}
					options={{
						tabBarLabel: `${t('예약')}`,
					}}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	);
}

export default WishTopTabNavigator;
