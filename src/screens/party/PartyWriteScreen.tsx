import { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import CustomButton from '@/components/common/CustomButton';
import CustomTextInput from '@/components/common/CustomTextInput';
import ImageInput from '@/components/common/ImageInput';
import PreviewImageList from '@/components/common/PreviewImageList';
import SelectTrueOrNot from '@/components/party/SelectTrueOrNot';
import DatePickerOption from '@/components/signup/DatePickerOption';
import { colors, partyNavigations } from '@/constants';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import { PartyStackParamList } from '@/navigations/stack/PartyStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getDateWithSeparator, getFormattedTime } from '@/utils';

type AddPostScreenProps = StackScreenProps<
	PartyStackParamList,
	typeof partyNavigations.PARTY_WRITE
>;

function PartyWriteScreen({ route }: AddPostScreenProps) {
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
	const [time, setTime] = useState(new Date());
	const [isBookedPlace, setIsBookedPlace] = useState(false);
	const [isChangePlace, setIsChangePlace] = useState(false);

	const [isDatePicked, setIsDatePicked] = useState(false);
	const [isTimePicked, setIsTimePicked] = useState(false);
	const dateModal = useModal();
	const timeModal = useModal();
	const selectBookedPlaceTrueOrNot = useModal();
	const selectChangePlaceTrueOrNot = useModal();

	const handleConfirmDate = () => {
		setIsDatePicked(true);
		dateModal.hide();
	};

	const handleConfirmTime = () => {
		setIsTimePicked(true);
		timeModal.hide();
	};

	const handleChangeDate = (pickedDate: Date) => {
		setDate(pickedDate);
	};

	const handleChangeTime = (pickedTime: Date) => {
		console.log(pickedTime);
		setTime(pickedTime);
	};

	return (
		<KeyboardAvoidingView
			behavior="padding"
			keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
			style={styles.container}
		>
			<SafeAreaView style={styles.container}>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<ImageInput onChange={imagePicker.handleChange} size="medium" />
					<PreviewImageList
						imageUris={imagePicker.imageUris}
						onDelete={imagePicker.delete}
						onChangeOrder={imagePicker.changeOrder}
					/>
					<View style={styles.inputContainer}>
						<Text style={styles.inputTitle}>
							파티 제목<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomTextInput value="" onChangeText={() => {}} />
						<Text style={styles.inputTitle}>
							파티 장소<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomTextInput value={address} onChangeText={() => {}} />
						<CustomTextInput
							value=""
							onChangeText={() => {}}
							placeholder="상세 주소를 입력해주세요"
						/>
						<Text style={styles.inputTitle}>
							최소 인원<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomTextInput
							inputMode="numeric"
							value=""
							onChangeText={() => {}}
						/>
						<Text style={styles.inputTitle}>
							최대 인원<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomTextInput
							inputMode="numeric"
							value=""
							onChangeText={() => {}}
						/>
						<Text style={styles.inputTitle}>
							파티 날짜<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomButton
							variant="outlined"
							size="large"
							label={
								isDatePicked ? getDateWithSeparator(date, '. ') : '날짜 선택'
							}
							onPress={dateModal.show}
						/>
						<Text style={styles.inputTitle}>
							시작 시간<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomButton
							variant="outlined"
							size="large"
							label={
								isTimePicked && time ? getFormattedTime(time) : '시간 선택'
							}
							onPress={timeModal.show}
						/>
						<Text style={styles.inputTitle}>
							장소 대관 여부<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomButton
							variant="outlined"
							size="large"
							label={isBookedPlace ? '예' : '아니오'}
							onPress={selectBookedPlaceTrueOrNot.show}
						/>
						<Text style={styles.inputTitle}>
							장소 변경 가능 여부<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomButton
							variant="outlined"
							size="large"
							label={isChangePlace ? '예' : '아니오'}
							onPress={selectChangePlaceTrueOrNot.show}
						/>
						<Text style={styles.inputTitle}>상세 설명</Text>
						<CustomTextInput multiline value="" onChangeText={() => {}} />
					</View>
					<DatePickerOption
						mode="date"
						date={date}
						isVisible={dateModal.isVisible}
						onChangeDate={handleChangeDate}
						onConfirmDate={handleConfirmDate}
						hideOption={dateModal.hide}
					/>
					<DatePickerOption
						mode="time"
						date={time}
						isVisible={timeModal.isVisible}
						onChangeDate={handleChangeTime}
						onConfirmDate={handleConfirmTime}
						hideOption={timeModal.hide}
					/>
					<SelectTrueOrNot
						isVisible={selectBookedPlaceTrueOrNot.isVisible}
						hideOption={selectBookedPlaceTrueOrNot.hide}
						setter={setIsBookedPlace}
					/>
					<SelectTrueOrNot
						isVisible={selectChangePlaceTrueOrNot.isVisible}
						hideOption={selectChangePlaceTrueOrNot.hide}
						setter={setIsChangePlace}
					/>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

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
			marginVertical: 20,
		},
		inputTitle: {
			fontSize: 18,
			fontFamily: 'Pretendard-Light',
		},
		privateInput: {
			fontSize: 18,
			color: colors[theme].RED_500,
		},
	});

export default PartyWriteScreen;
