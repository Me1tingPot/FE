import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {colors, feedTabNavigations} from '../../constants';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import PartyHomeScreen from '@/screens/party/PartyHomeScreen';
import WishHomeScreen from '@/screens/wish/WishHomeScreen';
import CommunityHomeScreen from '@/screens/community/CommunityHomeScreen';
import MyHomeScreen from '@/screens/my/MyHomeScreen';
import {RouteProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

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
      color={focused ? colors.BLACK : colors.GRAY_500}
      size={25}
    />
  );
}

const FeedTabNavigator = () => {
  const {t, i18n} = useTranslation(['en']);
  console.log(t('home2'));
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: colors.WHITE,
          shadowColor: colors.GRAY_200,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.BLACK,
        tabBarActiveTintColor: colors.BLACK,
        tabBarStyle: {
          backgroundColor: colors.WHITE,
          borderTopColor: colors.GRAY_200,
          borderTopWIdth: StyleSheet.hairlineWidth,
        },
        headerShown: false,
        tabBarIcon: ({focused}) => TabBarIcons(route, focused),
      })}>
      <Tab.Screen
        name={feedTabNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          tabBarLabel: `${t('bottomTab.home')}`,
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.PARTY_HOME}
        component={PartyHomeScreen}
        options={({navigation}) => ({
          tabBarLabel: 'Party',
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.WISH_HOME}
        component={WishHomeScreen}
        options={({navigation}) => ({
          tabBarLabel: 'Wish',
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.COMMUNITY_HOME}
        component={CommunityHomeScreen}
        options={({navigation}) => ({
          tabBarLabel: 'Community',
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.MY_HOME}
        component={MyHomeScreen}
        options={({navigation}) => ({
          tabBarLabel: 'My',
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default FeedTabNavigator;
