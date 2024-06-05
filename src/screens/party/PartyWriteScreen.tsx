import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import CustomButton from '@/components/common/CustomButton';
import CustomTextInput from '@/components/common/CustomTextInput';
import ImageInput from '@/components/common/ImageInput';
import PreviewImageList from '@/components/common/PreviewImageList';
import DatePickerOption from '@/components/signup/DatePickerOption';
import { colors, partyNavigations } from '@/constants';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getDateWithSeparator } from '@/utils';

type AddPostScreenProps = StackScreenProps<
	PartyStackParamList,
	typeof partyNavigations.PARTY_WRITE
>;

const PartyWriteScreen = ({ route }: AddPostScreenProps) => {
	const { location } = route.params;
	const { theme } = useThemeStore();
	const styles = styling(theme);
	usePermission('PHOTO');
	const imagePicker = useImagePicker({
		initialImages: [],
		maxFiles: 10,
	});
	const address = useGetAddress(location);

	const [date, setDate] = useState(new Date());

	const [isDatePicked, setIsDatePicked] = useState(false);
	const dateModal = useModal();

	const handleConfirmDate = () => {
		setIsDatePicked(true);
		dateModal.hide();
	};

	const handleChangeDate = (pickedDate: Date) => {
		setDate(pickedDate);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<ImageInput onChange={imagePicker.handleChange} size="medium" />
				<PreviewImageList
					imageUris={imagePicker.imageUris}
					onDelete={imagePicker.delete}
					onChangeOrder={imagePicker.changeOrder}
				/>
				<View style={styles.inputContainer}>
					<CustomTextInput value={address} />
					<CustomTextInput value="" />
					<CustomTextInput value="" />
					<CustomButton
						variant="outlined"
						size="large"
						label={
							isDatePicked ? getDateWithSeparator(date, '. ') : '날짜 선택'
						}
						onPress={dateModal.show}
					/>
				</View>
				<DatePickerOption
					date={date}
					isVisible={dateModal.isVisible}
					onChangeDate={handleChangeDate}
					onConfirmDate={handleConfirmDate}
					hideOption={dateModal.hide}
				/>
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
		inputContainer: {
			gap: 20,
			marginBottom: 20,
		},
	});

export default PartyWriteScreen;
