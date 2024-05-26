import { createStackNavigator } from '@react-navigation/stack';
import PartyHomeHeader from '@/components/party/PartyHomeHeader';
import { colors, partyNavigations } from '@/constants';
import PartyReservationScreen from '@/screens/party/PartyReservationScreen';
import PartySaveScreen from '@/screens/party/PartySaveScreen';
import useThemeStore from '@/store/useThemeStore';

export type PartyStackParamList = {
	[partyNavigations.PARTY_SAVE]: undefined;
	[partyNavigations.PARTY_RESERVATION]: undefined;
};

function PartyStackNavigator() {
	const Stack = createStackNavigator<PartyStackParamList>();
	const { theme } = useThemeStore();

	return (
		<Stack.Navigator
			screenOptions={({ navigation }) => ({
				cardStyle: {
					backgroundColor: colors[theme].WHITE,
				},
				headerShown: false,

				headerTintColor: colors[theme].BLACK,
			})}
		>
			<Stack.Screen
				name={partyNavigations.PARTY_SAVE}
				component={PartySaveScreen}
			/>
			<Stack.Screen
				name={partyNavigations.PARTY_RESERVATION}
				component={PartyReservationScreen}
			/>
		</Stack.Navigator>
	);
}

export default PartyStackNavigator;
