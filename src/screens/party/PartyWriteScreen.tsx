import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomTextInput from '@/components/common/CustomTextInput';
import ImageInput from '@/components/common/ImageInput';
import PreviewImageList from '@/components/common/PreviewImageList';
import SearchInput from '@/components/common/SearchInput';
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

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<ImageInput onChange={imagePicker.handleChange} size="medium" />
				<PreviewImageList
					imageUris={imagePicker.imageUris}
					onDelete={imagePicker.delete}
					onChangeOrder={imagePicker.changeOrder}
				/>
				<View style={styles.textContainer}>
					<View style={styles.textWrapper}>
						<Text style={styles.label}>파티 제목</Text>
						<CustomTextInput
							placeholder="파티 제목"
							placeholderTextColor={colors[theme].GRAY_500}
						/>
					</View>
					<View style={styles.textWrapper}>
						<Text style={styles.label}>파티 장소</Text>
						<CustomTextInput
							placeholder="파티 장소"
							placeholderTextColor={colors[theme].GRAY_500}
						/>
					</View>
					<View style={styles.textWrapper}>
						<Text style={styles.label}>상세 설명</Text>
						<CustomTextInput
							placeholder="파티 제목"
							placeholderTextColor={colors[theme].GRAY_500}
							numberOfLines={20}
						/>
					</View>
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
		contentContainer: {
			padding: 20,
		},
		textContainer: {
			gap: 15,
		},
		textWrapper: {
			gap: 20,
		},
		label: {
			color: colors[theme].GRAY_500,
		},
	});

export default PartyWriteScreen;
