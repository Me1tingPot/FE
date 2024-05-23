import { Controller, useFormContext } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

type EmailProps = {
	onNext: () => void;
};

const Email = ({ onNext }: EmailProps) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<View style={styles.container}>
			<ScrollView>
				<View>
					<Text style={styles.title}>이메일을 입력해주세요.</Text>
					<Text style={styles.description}>
						신분 인증 후에는 해당 이메일로 로그인할 수 있어요.
					</Text>
				</View>

				<Controller
					control={control}
					name="email"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomTextInput
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							placeholder="예시) melting_pot@gmail.com"
							keyboardType="email-address"
							variant={errors.email ? 'error' : 'default'}
						/>
					)}
				/>
			</ScrollView>

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
	});

export default Email;
