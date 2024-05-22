import { useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import { SignupInputs } from '@/screens/auth/SignUpScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

type EmailProps = {
	onNext: () => void;
	register: UseFormRegister<SignupInputs>;
	error?: FieldError | undefined;
};

const Email = ({ onNext }: EmailProps) => {
	const [email, setEmail] = useState('');
	const { theme } = useThemeStore();
	const styles = styilng(theme);
	return (
		<View style={styles.conatiner}>
			<View>
				<Text style={styles.title}>이메일을 입력해주세요.</Text>
				<Text style={styles.description}>
					신분 인증 후에는 해당 이메일로 로그인할 수 있어요.
				</Text>
			</View>

			<CustomTextInput
				value={email}
				onChangeText={t => setEmail(t)}
				placeholder="예시) melting_pot@gmail.com"
			/>

			<View style={styles.buttonPosition}>
				<CustomButton label="다음으로" onPress={onNext} variant={'filled'} />
			</View>
		</View>
	);
};

const styilng = (theme: ThemeMode) =>
	StyleSheet.create({
		conatiner: {
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

export default Email;
