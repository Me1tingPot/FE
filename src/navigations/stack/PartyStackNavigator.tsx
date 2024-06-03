import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, partyNavigations } from '@/constants';
import PartyDetailScreen from '@/screens/party/PartyDetailScreen';
import PartyHomeScreen from '@/screens/party/PartyHomeScreen';
import PartyWriteScreen from '@/screens/party/PartyWriteScreen';
import useThemeStore from '@/store/useThemeStore';

export type PartyStackParamList = {
	[partyNavigations.PARTY_HOME]: undefined;
	[partyNavigations.PARTY_WRITE]: undefined;
	[partyNavigations.PARTY_DETAIL]: undefined;
};

const Stack = createStackNavigator<PartyStackParamList>();

function PartyStackNavigator() {
	const { t } = useTranslation();
	const { theme } = useThemeStore();

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
				}}
			/>
			<Stack.Screen
				name={partyNavigations.PARTY_DETAIL}
				component={PartyDetailScreen}
			/>
		</Stack.Navigator>
	);
}

export default PartyStackNavigator;