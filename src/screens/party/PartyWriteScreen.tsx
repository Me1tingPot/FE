import {
	Image,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import ImageInput from '@/components/common/ImageInput';
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
			<ScrollView>
				<ImageInput onChange={imagePicker.handleChange} />
				<View style={{ width: 70, height: 70 }}>
					{imagePicker.imageUris.map(({ uri }, index) => {
						return (
							<Image
								key={index}
								source={{
									uri: `${
										Platform.OS === 'ios'
											? 'http://localhost:3030'
											: 'http://10.0.2.2:3030'
									}/${uri}`,
								}}
								style={{ width: '100%', height: '100%' }}
							/>
						);
					})}
				</View>
			</ScrollView>
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
