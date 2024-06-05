import { useTranslation } from 'react-i18next';
import { LatLng } from 'react-native-maps';
import {
	StackNavigationOptions,
	createStackNavigator,
} from '@react-navigation/stack';
import { colors, partyNavigations } from '@/constants';
import PartyDetailScreen from '@/screens/party/PartyDetailScreen';
import PartyHomeScreen from '@/screens/party/PartyHomeScreen';
import PartySearchScreen from '@/screens/party/PartySearchScreen';
import PartyWriteScreen from '@/screens/party/PartyWriteScreen';
import useThemeStore from '@/store/useThemeStore';

export type PartyStackParamList = {
	[partyNavigations.PARTY_HOME]: undefined;
	[partyNavigations.PARTY_WRITE]: { location: LatLng };
	[partyNavigations.PARTY_DETAIL]: undefined;
	[partyNavigations.PARTY_SEARCH]: undefined;
};

const Stack = createStackNavigator<PartyStackParamList>();

function PartyStackNavigator() {
	const { t } = useTranslation();
	const { theme } = useThemeStore();

	const commonHeaderOptions: StackNavigationOptions = {
		headerStyle: { backgroundColor: colors[theme].WHITE },
		headerTitleStyle: { color: colors[theme].BLACK },
		headerLeftLabelVisible: false,
		headerShadowVisible: false,
		headerTitleAlign: 'center',
		headerTintColor: colors[theme].BLACK,
	};

	return (
		<Stack.Navigator
			initialRouteName={partyNavigations.PARTY_HOME}
			screenOptions={{
				cardStyle: {
					backgroundColor: colors[theme].WHITE,
				},
				headerShown: false,
			}}
		>
			<Stack.Screen
				name={partyNavigations.PARTY_HOME}
				component={PartyHomeScreen}
			/>
			<Stack.Screen
				name={partyNavigations.PARTY_WRITE}
				component={PartyWriteScreen}
				options={{
					headerShown: true,
					headerTitle: `${t('파티 주최하기')}`,
					...commonHeaderOptions,
				}}
			/>
			<Stack.Screen
				name={partyNavigations.PARTY_DETAIL}
				component={PartyDetailScreen}
			/>
			<Stack.Screen
				name={partyNavigations.PARTY_SEARCH}
				component={PartySearchScreen}
				options={{
					presentation: 'modal',
					headerShown: true,
					headerTitle: '장소 검색',
				}}
			/>
		</Stack.Navigator>
	);
}

export default PartyStackNavigator;
