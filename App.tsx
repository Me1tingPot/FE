import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import useThemeStorage from '@/hooks/useThemeStorage';
import queryClient from './src/api/queryClient';
import RootNavigator from './src/navigations/root/RootNavigator';

function App() {
	const { theme } = useThemeStorage();
	return (
		<QueryClientProvider client={queryClient}>
			<StatusBar
				barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
			/>
			<NavigationContainer>
				<RootNavigator />
			</NavigationContainer>
		</QueryClientProvider>
	);
}

export default App;
