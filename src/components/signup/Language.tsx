import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
	Alert,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

const countries = [
	'미국 (United States)',
	'캐나다 (Canada)',
	'영국 (United Kingdom)',
	'프랑스 (France)',
	'독일 (Germany)',
	'일본 (Japan)',
	'중국 (China)',
	'이탈리아 (Italy)',
	'브라질 (Brazil)',
	'인도 (India)',
	'호주 (Australia)',
	'스페인 (Spain)',
	'멕시코 (Mexico)',
	'남아프리카 (South Africa)',
	'러시아 (Russia)',
	'대한민국 (South Korea)',
	'북한 (North Korea)',
	'태국 (Thailand)',
	'이란 (Iran)',
	'터키 (Turkey)',
];

type LanguageProps = {
	onNext: () => void;
	onSubmit: (data: any) => Promise<void>;
};

const Language = ({ onNext, onSubmit }: LanguageProps) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useFormContext();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const [local, setLocal] = useState('');
	const [language, setLanguage] = useState<string[]>([]);
	const [open, setOpen] = useState({ local: false, language: false });

	const toggleSelection = (item: string) => {
		if (language.includes(item)) {
			setLanguage(prevLanguages =>
				prevLanguages.filter(language => language !== item),
			);
		} else {
			if (language.length < 3) {
				setLanguage(prevLanguages => [...prevLanguages, item]);
			} else {
				Alert.alert('', '최대 3개의 언어를 선택할 수 있습니다.');
			}
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.title}>국적을 선택해주세요!</Text>
					<Text style={styles.description}>이후 변경할 수 있습니다.</Text>
					<Controller
						control={control}
						name="local"
						render={({ field: { onChange, onBlur, value } }) => (
							<CustomTextInput
								value={value || local}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder="국적 선택하기"
								variant="success"
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
										onPress={() => setLocal(item)}
									>
										<Text>{item}</Text>
									</Pressable>
								))}
							</GestureHandlerScrollView>
						</View>
					)}
				</View>

				<View style={styles.marginTop}>
					<Text style={styles.title}>사용 언어를 선택해주세요.</Text>
					<Text style={styles.description}>최소 1개, 최대 3개</Text>
					<Controller
						control={control}
						name="language"
						render={({ field: { onChange, onBlur, value } }) => (
							<CustomTextInput
								value={value || language.join(', ')}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder="사용 언어 선택하기"
								variant="success"
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
											language.includes(item) && {
												backgroundColor: colors[theme].GREEN_500,
											},
										]}
										onPress={() => toggleSelection(item)}
									>
										<Text>{item}</Text>
									</Pressable>
								))}
							</GestureHandlerScrollView>
						</View>
					)}
				</View>
			</ScrollView>

			<View style={styles.buttonPosition}>
				<CustomButton
					label="다음으로"
					onPress={() => {
						onNext();
						setValue('local', local);
						setValue('language', language);
						handleSubmit(onSubmit)();
					}}
					variant={'filled'}
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
	});

export default Language;
