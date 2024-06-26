import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	Alert,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import { SignupInputs } from '@/screens/auth/SignUpScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

const countries = [
	'United States',
	'Canada',
	'United Kingdom',
	'France',
	'Germany',
	'Japan',
	'China',
	'Italy',
	'Brazil',
	'India',
	'Australia',
	'Spain',
	'Mexico',
	'South Africa',
	'Russia',
	'South Korea',
	'North Korea',
	'Thailand',
	'Iran',
	'Turkey',
];

type LanguageProps = {
	onSubmit: (data: any) => Promise<void>;
	isPending?: boolean;
};

const Language = ({ isPending, onSubmit }: LanguageProps) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useFormContext<SignupInputs>();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();
	const [local, setLocal] = useState('');
	const [languages, setLanguages] = useState<string[]>([]);
	const [open, setOpen] = useState({ local: false, language: false });

	const toggleSelection = (item: string) => {
		if (languages.includes(item)) {
			setLanguages(prevLanguages =>
				prevLanguages.filter(language => language !== item),
			);
		} else {
			if (languages.length < 3) {
				setLanguages(prevLanguages => [...prevLanguages, item]);
			} else {
				Alert.alert('', '최대 3개의 언어를 선택할 수 있습니다.');
			}
		}
	};

	const handleSubmitData = () => {
		if (!local || languages.length <= 0) {
			Toast.show({
				type: 'error',
				text1: t('국적 및 사용 언어를 선택해주세요.'),
				visibilityTime: 2000,
				position: 'bottom',
			});
			return;
		}
		setValue('nationality', local);
		setValue('languages', languages);
		handleSubmit(onSubmit)();
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.title}>{t('국적을 선택해주세요!')}</Text>
					<Text style={styles.description}>
						{t('이후 변경할 수 있습니다.')}
					</Text>
					<Controller
						control={control}
						name="nationality"
						render={({ field: { onChange, onBlur, value } }) => (
							<CustomTextInput
								value={value || local}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder={t('국적 선택하기')}
								variant="success"
								placeholderTextColor={colors[theme].GRAY_300}
								icon={
									open.local ? (
										<Pressable
											onPress={() =>
												setOpen(prev => ({ ...prev, local: false }))
											}
										>
											<MaterialIcons
												name="keyboard-double-arrow-up"
												color={colors[theme].GRAY_300}
												size={25}
											/>
										</Pressable>
									) : (
										<Pressable
											onPress={() =>
												setOpen(prev => ({ ...prev, local: true }))
											}
										>
											<MaterialIcons
												name="keyboard-double-arrow-down"
												color={colors[theme].GRAY_300}
												size={25}
											/>
										</Pressable>
									)
								}
								editable={false}
							/>
						)}
					/>
					{open.local && (
						<View style={styles.menuLayout}>
							<GestureHandlerScrollView style={styles.dropDownMenu}>
								{countries.map((item, index) => (
									<Pressable
										key={index}
										style={[
											styles.menu,
											local === item && {
												backgroundColor: colors[theme].GREEN_500,
											},
										]}
										onPress={() => {
											setLocal(item);
											setOpen(prev => ({ ...prev, local: false }));
										}}
									>
										<Text style={styles.menuText}>{item}</Text>
									</Pressable>
								))}
							</GestureHandlerScrollView>
						</View>
					)}
				</View>

				<View style={styles.marginTop}>
					<Text style={styles.title}>{t('사용 언어를 선택해주세요.')}</Text>
					<Text style={styles.description}>{t('최소 1개, 최대 3개')}</Text>
					<Controller
						control={control}
						name="languages"
						render={({ field: { onChange, onBlur, value } }) => (
							<CustomTextInput
								value={languages.join(', ')}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder={t('사용 언어 선택하기')}
								variant="success"
								placeholderTextColor={colors[theme].GRAY_300}
								icon={
									open.language ? (
										<Pressable
											onPress={() =>
												setOpen(prev => ({ ...prev, language: false }))
											}
										>
											<MaterialIcons
												name="keyboard-double-arrow-up"
												color={colors[theme].GRAY_300}
												size={25}
											/>
										</Pressable>
									) : (
										<Pressable
											onPress={() =>
												setOpen(prev => ({ ...prev, language: true }))
											}
										>
											<MaterialIcons
												name="keyboard-double-arrow-down"
												color={colors[theme].GRAY_300}
												size={25}
											/>
										</Pressable>
									)
								}
								editable={false}
							/>
						)}
					/>
					{open.language && (
						<View style={styles.menuLayout}>
							<GestureHandlerScrollView style={styles.dropDownMenu}>
								{countries.map((item, index) => (
									<Pressable
										key={index}
										style={[
											styles.menu,
											languages.includes(item) && {
												backgroundColor: colors[theme].GREEN_500,
											},
										]}
										onPress={() => toggleSelection(item)}
									>
										<Text style={styles.menuText}>{item}</Text>
									</Pressable>
								))}
							</GestureHandlerScrollView>
						</View>
					)}
				</View>
			</ScrollView>

			<View style={styles.buttonPosition}>
				<CustomButton
					label={t('다음으로')}
					onPress={handleSubmitData}
					variant={'filled'}
					isLoading={isPending}
				/>
			</View>
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			paddingVertical: 50,
			paddingHorizontal: 40,
		},
		marginTop: {
			marginTop: 40,
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
			marginBottom: 30,
			fontSize: 14,
			color: colors[theme].GRAY_500,
		},
		textPoint: {
			color: colors[theme].GRAY_700,
			fontWeight: '700',
		},
		menuLayout: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 5,
			marginBottom: 5,
		},
		dropDownMenu: {
			width: '95%',
			height: 143,
			borderWidth: 1,
			borderColor: colors[theme].GREEN_500,
			borderRadius: 10,
			backgroundColor: colors[theme].WHITE,
		},
		menu: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			paddingVertical: 15,
			paddingHorizontal: 30,
			borderBottomWidth: 0.5,
			borderBottomColor: colors[theme].GREEN_500,
		},
		menuText: {
			color: colors[theme].BLACK,
		},
	});

export default Language;
