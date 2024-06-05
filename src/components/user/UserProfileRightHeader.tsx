import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

const UserProfileRightHeader = () => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => console.log('click')}
				activeOpacity={0.8}
			>
				<Ionicons name="share-outline" size={25} />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => console.log('click')}
				activeOpacity={0.8}
			>
				<Ionicons name="ellipsis-vertical" size={25} />
			</TouchableOpacity>
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			marginRight: 5,
		},
	});

export default UserProfileRightHeader;
