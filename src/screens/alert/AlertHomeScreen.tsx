import { useCallback, useState } from 'react';
import {
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
} from 'react-native';
import AlertBox from '@/components/alert/AlertBox';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

function AlertHomeScreen() {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.contentContainer}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				{new Array(10).fill(null).map((_, idx) => (
					<AlertBox key={idx} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		contentContainer: {
			paddingHorizontal: 20,
		},
	});

export default AlertHomeScreen;
