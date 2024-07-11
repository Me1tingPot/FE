import { useState } from 'react';
import {
	Image,
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

	const [party, setParty] = useState({
		date: new Date(),
		time: new Date(),
		isBookedPlace: false,
		isChangePlace: false,
		title: '',
		detailPlace: '',
		minParticipants: '',
		maxParticipants: '',
		detailParty: '',
		isDatePicked: false,
		isTimepicked: false,
		image: [],
	});

	const dateModal = useModal();
	const timeModal = useModal();
	const selectBookedPlaceTrueOrNot = useModal();
	const selectChangePlaceTrueOrNot = useModal();

	const handleChangeTitle = (value: string) => {
		setParty(prev => ({ ...prev, title: value }));
	};
	const handleDetailPlace = (value: string) => {
		setParty(prev => ({ ...prev, detailPlace: value }));
	};
	const handleMinParticipants = (value: string) => {
		setParty(prev => ({ ...prev, minParticipants: value }));
	};
	const hanldeMaxParticipants = (value: string) => {
		setParty(prev => ({ ...prev, maxParticipants: value }));
	};
	const handleConfirmDate = () => {
		setParty(prev => ({ ...prev, isDatePicked: true }));
		dateModal.hide();
	};
	const handleConfirmTime = () => {
		setParty(prev => ({ ...prev, isTimepicked: true }));
		timeModal.hide();
	};
	const handleChangeDate = (pickedDate: Date) => {
		setParty(prev => ({ ...prev, date: pickedDate }));
	};
	const handleChangeTime = (pickedTime: Date) => {
		setParty(prev => ({ ...prev, time: pickedTime }));
	};
	const handleIsBookedPlace = (value: boolean) => {
		setParty(prev => ({ ...prev, isBookedPlace: value }));
	};
	const handleIsChangePlace = (value: boolean) => {
		setParty(prev => ({ ...prev, isChangePlace: value }));
	};
	const handleChangeDetailParty = (value: string) => {
		setParty(prev => ({ ...prev, detailParty: value }));
	};

	const handleOnSubmit = () => {
		console.log('업로드 데이터: ', party);
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
					{imagePicker.imageUris.length > 0 &&
						imagePicker.imageUris.map(image => (
							<Image source={{ uri: image.uri }} width={20} height={20} />
						))}
					<PreviewImageList
						imageUris={imagePicker.imageUris}
						onDelete={imagePicker.delete}
						onChangeOrder={imagePicker.changeOrder}
					/>
					<View style={styles.inputContainer}>
						<Text style={styles.inputTitle}>
							파티 제목<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomTextInput
							value={party.title}
							onChangeText={handleChangeTitle}
						/>
						<Text style={styles.inputTitle}>
							파티 장소<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomTextInput value={address} onChangeText={() => {}} />
						<CustomTextInput
							value={party.detailPlace}
							onChangeText={handleDetailPlace}
							placeholder="상세 주소를 입력해주세요"
						/>
						<Text style={styles.inputTitle}>
							최소 인원<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomTextInput
							inputMode="numeric"
							value={party.minParticipants}
							onChangeText={handleMinParticipants}
						/>
						<Text style={styles.inputTitle}>
							최대 인원<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomTextInput
							inputMode="numeric"
							value={party.maxParticipants}
							onChangeText={hanldeMaxParticipants}
						/>
						<Text style={styles.inputTitle}>
							파티 날짜<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomButton
							variant="outlined"
							size="large"
							label={
								party.date
									? getDateWithSeparator(party.date, '. ')
									: '날짜 선택'
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
								party.time && party.time
									? getFormattedTime(party.time)
									: '시간 선택'
							}
							onPress={timeModal.show}
						/>
						<Text style={styles.inputTitle}>
							장소 대관 여부<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomButton
							variant="outlined"
							size="large"
							label={party.isBookedPlace ? '예' : '아니오'}
							onPress={selectBookedPlaceTrueOrNot.show}
						/>
						<Text style={styles.inputTitle}>
							장소 변경 가능 여부<Text style={styles.privateInput}>*</Text>
						</Text>
						<CustomButton
							variant="outlined"
							size="large"
							label={party.isChangePlace ? '예' : '아니오'}
							onPress={selectChangePlaceTrueOrNot.show}
						/>
						<Text style={styles.inputTitle}>상세 설명</Text>
						<CustomTextInput
							multiline
							value={party.detailParty}
							onChangeText={handleChangeDetailParty}
						/>
					</View>
					<DatePickerOption
						mode="date"
						date={party.date}
						isVisible={dateModal.isVisible}
						onChangeDate={handleChangeDate}
						onConfirmDate={handleConfirmDate}
						hideOption={dateModal.hide}
					/>
					<DatePickerOption
						mode="time"
						date={party.time}
						isVisible={timeModal.isVisible}
						onChangeDate={handleChangeTime}
						onConfirmDate={handleConfirmTime}
						hideOption={timeModal.hide}
					/>
					<SelectTrueOrNot
						isVisible={selectBookedPlaceTrueOrNot.isVisible}
						hideOption={selectBookedPlaceTrueOrNot.hide}
						setter={handleIsBookedPlace}
					/>
					<SelectTrueOrNot
						isVisible={selectChangePlaceTrueOrNot.isVisible}
						hideOption={selectChangePlaceTrueOrNot.hide}
						setter={handleIsChangePlace}
					/>
					<CustomButton onPress={handleOnSubmit} label="작성 완료" />
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
			color: colors[theme].BLACK,
		},
		privateInput: {
			fontSize: 18,
			color: colors[theme].RED_500,
		},
	});

export default PartyWriteScreen;
