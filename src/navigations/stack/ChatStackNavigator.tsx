import { chatNavigations, colors } from '@/constants'
import ChatHomeScreen from '@/screens/chat/ChatHomeScreen';
import ChatScreen from '@/screens/chat/ChatScreen';
import useThemeStore from '@/store/useThemeStore';
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

export type ChatStackParamList = {
  [chatNavigations.CHAT_HOME]: undefined;
  [chatNavigations.CHAT_DETAIL]: { id: number }
}

const Stack = createStackNavigator<ChatStackParamList>();

function ChatStackNavigator() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  const commonHeaderOptions: StackNavigationOptions = {
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: colors[theme].WHITE,
    },
    headerTitleStyle: {
      color: colors[theme].BLACK,
    },
    headerTintColor: colors[theme].BLACK,
  };

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors[theme].WHITE,
        },
        headerStyle: {
          shadowColor: colors[theme].GRAY_200,
          backgroundColor: colors[theme].WHITE,
        },
        headerTitleStyle: {
          fontSize: 20,
        },
        headerTintColor: colors[theme].GRAY_700,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name={chatNavigations.CHAT_HOME}
        component={ChatHomeScreen}
        options={{
          headerShown: true,
          headerTitle: `${t('채팅')}`,
        }}
      />
      <Stack.Screen
        name={chatNavigations.CHAT_DETAIL}
        component={ChatScreen}
        options={{
          headerShown: false,
          ...commonHeaderOptions
        }}
      />
    </Stack.Navigator>
  )
}

export default ChatStackNavigator;