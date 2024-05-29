import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import MyHomeScreen from '@/screens/my/MyHomeScreen';
import PartyHomeScreen from '@/screens/party/PartyHomeScreen';
import useThemeStore from '@/store/useThemeStore';
import { colors, feedTabNavigations } from '../../constants';
import CommunityTopTabNavigator from '../topTab/CommunityTopTabNavigator';
import WishTopTabNavigator from '../topTab/WishTopTabNavigator';

export type FeedTabParamList = {
	[feedTabNavigations.FEED_HOME]: undefined;
	[feedTabNavigations.PARTY_HOME]: undefined;
	[feedTabNavigations.WISH_HOME]: undefined;
	[feedTabNavigations.COMMUNITY_HOME]: undefined;
	[feedTabNavigations.MY_HOME]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function TabBarIcons(route: RouteProp<FeedTabParamList>, focused: boolean) {
	let iconName = '';
	const { theme } = useThemeStore();
	switch (route.name) {
		case feedTabNavigations.FEED_HOME: {
			iconName = focused ? 'home' : 'home-outline';
			break;
		}
		case feedTabNavigations.PARTY_HOME: {
			iconName = focused ? 'people' : 'people-outline';
			break;
		}
		case feedTabNavigations.WISH_HOME: {
			iconName = focused ? 'heart' : 'heart-outline';
			break;
		}
		case feedTabNavigations.COMMUNITY_HOME: {
			iconName = focused ? 'earth' : 'earth-outline';
			break;
		}
		case feedTabNavigations.MY_HOME: {
			iconName = focused ? 'person-circle' : 'person-circle-outline';
			break;
		}
	}

	return (
		<Ionicons
			name={iconName}
			color={focused ? colors[theme].BLACK : colors[theme].GRAY_500}
			size={25}
		/>
	);
}

function FeedTabNavigator() {
	const { theme } = useThemeStore();
	const { t } = useTranslation();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerStyle: {
					backgroundColor: colors[theme].WHITE,
					shadowColor: colors[theme].GRAY_200,
				},
				headerTitleStyle: {
					fontSize: 15,
				},
				headerTintColor: colors[theme].BLACK,
				tabBarActiveTintColor: colors[theme].BLACK,
				tabBarStyle: {
					backgroundColor: colors[theme].WHITE,
					borderTopColor: colors[theme].GRAY_200,
					borderTopWIdth: StyleSheet.hairlineWidth,
				},
				headerShown: false,
				tabBarIcon: ({ focused }) => TabBarIcons(route, focused),
			})}
		>
			<Tab.Screen
				name={feedTabNavigations.FEED_HOME}
				component={FeedHomeScreen}
				options={({ navigation }) => ({
					tabBarLabel: `${t('홈')}`,
					headerShown: true,
					headerTitle: ' ',
					headerLeft: () => <FeedHomeHeaderLeft />,
					headerRight: () => (
						<Pressable style={{ marginRight: 10 }}>
							<Ionicons name="notifications-outline" size={25} />
						</Pressable>
					),
				})}
			/>
			<Tab.Screen
				name={feedTabNavigations.PARTY_HOME}
				component={PartyHomeScreen}
				options={({ navigation, route }) => ({
					tabBarLabel: `${t('파티')}`,
				})}
			/>
			<Tab.Screen
				name={feedTabNavigations.WISH_HOME}
				component={WishTopTabNavigator}
				options={({ navigation }) => ({
					tabBarLabel: `${t('위시리스트')}`,
				})}
			/>
			<Tab.Screen
				name={feedTabNavigations.COMMUNITY_HOME}
				component={CommunityTopTabNavigator}
				options={({ navigation }) => ({
					tabBarLabel: `${t('커뮤니티')}`,
				})}
			/>
			<Tab.Screen
				name={feedTabNavigations.MY_HOME}
				component={MyHomeScreen}
				options={({ navigation }) => ({
					tabBarLabel: `${t('마이페이지')}`,
				})}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({});

export default FeedTabNavigator;
