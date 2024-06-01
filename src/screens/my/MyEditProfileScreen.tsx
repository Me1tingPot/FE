import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ChangeProfileModal from '@/components/my/ChangeProfileModal';
import { colors } from '@/constants';
import useModal from '@/hooks/useModal';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface MyEditProfileScreenProps {}

const MyEditProfileScreen = ({}: MyEditProfileScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const compoundModal = useModal();

	return (
		<SafeAreaView style={styles.container}>
			<ChangeProfileModal
				isVisible={compoundModal.isVisible}
				hideOption={compoundModal.hide}
			/>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
	});

export default MyEditProfileScreen;
