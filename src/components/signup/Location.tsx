import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import usePermission from '@/hooks/usePermission';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

type LocationProps = {
	onNext: () => void;
};

function Location({ onNext }: LocationProps) {
	const {
		control,
		formState: { errors },
		setValue,
	} = useFormContext();
	// TODO | locaion 입력 받는 형식, 검색 방식 확인 후 UI 및 로직 수정
	const [location, setLocation] = useState('');
	const [city, setCity] = useState('');
	const [town, setTown] = useState('');
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	usePermission('LOCATION');

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.contentsContainer}>
				<View>
					<Text style={styles.title}>{t('어디에 계신가요?')}</Text>
					<Text style={styles.description}>
						{t('위치 정보를 이용하여')}
						<Text style={styles.textPoint}>{t('가까운 파티')}</Text>
						{t('를 추천해드릴게요.')}
					</Text>
				</View>

				<Controller
					control={control}
					name="location"
					render={({ field: { onChange, onBlur, value } }) => (
						<Pressable onPress={() => console.log('click')}>
							<CustomTextInput
								value={location || '위치 선택'}
								onChangeText={onChange}
								onBlur={onBlur}
								variant="success"
								icon={
									<MaterialIcons
										name="keyboard-arrow-down"
										color={colors[theme].GRAY_300}
										size={25}
									/>
								}
								editable={false}
							/>
						</Pressable>
					)}
				/>

				<View style={styles.smallDropDownContainer}>
					<Pressable onPress={() => console.log('click')} style={{ flex: 1 }}>
						<CustomTextInput
							value={city || '시/도'}
							onChangeText={() => {}}
							variant="default"
							icon={
								<MaterialIcons
									name="keyboard-arrow-down"
									color={colors[theme].GRAY_300}
									size={25}
								/>
							}
							editable={false}
						/>
					</Pressable>

					<Pressable onPress={() => console.log('click')} style={{ flex: 1 }}>
						<CustomTextInput
							value={town || '시/군/구'}
							onChangeText={() => {}}
							variant="default"
							icon={
								<MaterialIcons
									name="keyboard-arrow-down"
									color={colors[theme].GRAY_300}
									size={25}
								/>
							}
							editable={false}
						/>
					</Pressable>
				</View>
			</ScrollView>

			<View style={styles.buttonPosition}>
				<CustomButton label={t('다음으로')} onPress={onNext} variant="filled" />
			</View>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			gap: 30,
			paddingVertical: 50,
			paddingHorizontal: 40,
		},
		contentsContainer: {
			display: 'flex',
			flexDirection: 'column',
			rowGap: 20,
		},
		buttonPosition: {
			marginTop: 'auto',
		},
		title: {
			fontSize: 20,
			color: colors[theme].GRAY_700,
		},
		description: {
			marginTop: 10,
			fontSize: 14,
			color: colors[theme].GRAY_500,
		},
		textPoint: {
			color: colors[theme].GRAY_700,
			fontWeight: '700',
		},
		smallDropDownContainer: {
			display: 'flex',
			flexDirection: 'row',
			gap: 20,
		},
	});

export default Location;
