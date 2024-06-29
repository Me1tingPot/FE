import { UseFormProps } from 'react-hook-form';
import { SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp } from '@react-navigation/native';
import GenericForm from '@/components/form/GenericForm';
import Login from '@/components/login/Login';
import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { loginSchema } from '@/schema';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

export interface LoginInputs {
	email: string;
	password: string;
}

interface LoginScreenProps {
	navigation: NavigationProp<AuthStackParamList>;
}

function LoginScreen({ navigation }: LoginScreenProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const loginFormOptions: UseFormProps<LoginInputs> = {
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		reValidateMode: 'onChange',
	};

	const { loginMutation, getNewAccessToken } = useAuth();

	const onSubmit = async (data: LoginInputs) => {
		const { email, password } = data;
		loginMutation.mutate(
			{ email, password },
			{
				onError: error => {
					Toast.show({
						type: 'error',
						text1: error.response?.data.message || '로그인 에러발생',
						visibilityTime: 2000,
						position: 'bottom',
					});
				},
			},
		);
		// console.log(data);
	};

	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={['#FF3666', '#FF4F6E', '#D67DFF']}
				style={styles.redCircle}
			/>
			<LinearGradient
				colors={['#DCFFEA', '#C5FFDD', '#A5F2E1']}
				style={styles.greenCircle}
			/>
			<GenericForm<LoginInputs> formOptions={loginFormOptions}>
				<Login onSubmit={onSubmit} isPending={loginMutation.isPending} />
			</GenericForm>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		redCircle: {
			width: 400,
			height: 400,
			position: 'absolute',
			borderRadius: 500,
			bottom: -130,
			right: 120,
			opacity: 0.8,
		},
		greenCircle: {
			width: 400,
			height: 400,
			position: 'absolute',
			borderRadius: 500,
			bottom: -80,
			left: 140,
		},
	});

export default LoginScreen;
