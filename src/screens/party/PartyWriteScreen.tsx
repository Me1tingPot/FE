import {
	Image,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import ImageInput from '@/components/common/ImageInput';
import PreviewImageList from '@/components/common/PreviewImageList';
import { colors } from '@/constants';
import useImagePicker from '@/hooks/useImagePicker';
import usePermission from '@/hooks/usePermission';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface PartyWriteScreenProps {}

const PartyWriteScreen = ({}: PartyWriteScreenProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	usePermission('PHOTO');
	const imagePicker = useImagePicker({
		initialImages: [],
		maxFiles: 10,
	});
	console.log('imagePicker.imageUris', imagePicker.imageUris);

	return (
		<SafeAreaView style={styles.container}>
			<ImageInput onChange={imagePicker.handleChange} size="medium" />
			<PreviewImageList
				imageUris={imagePicker.imageUris}
				onDelete={imagePicker.delete}
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

export default PartyWriteScreen;
