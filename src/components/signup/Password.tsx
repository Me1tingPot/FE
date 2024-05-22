import { useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import { SignupInputs } from '@/screens/auth/SignUpScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

type PasswordProps = {
	onNext: () => void;
	register: UseFormRegister<SignupInputs>;
	error?: FieldError | undefined;
};

const Password = ({ onNext }: PasswordProps) => {
	const [password, setPassword] = useState('');
	const [passwordCheck, setPassWordCheck] = useState('');
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>비밀번호를 입력해주세요.</Text>
				<Text style={styles.description}>추후 변경할 수 있어요.</Text>
			</View>

			<View style={styles.buttonContainer}>
				<CustomTextInput
					value={password}
					onChangeText={t => setPassword(t)}
					placeholder="비밀번호 입력"
					message="최소 8자, 최대 20자"
				/>
				<CustomTextInput
					value={passwordCheck}
					onChangeText={t => setPassWordCheck(t)}
					placeholder="비밀번호 확인"
				/>
			</View>

			<View style={styles.buttonPosition}>
				<CustomButton label="다음으로" onPress={onNext} variant={'filled'} />
			</View>
		</View>
	);
};

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
		buttonPosition: {
			marginTop: 'auto',
		},
		buttonContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
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
	});

export default Password;
