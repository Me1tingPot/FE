import { UseFormProps } from 'react-hook-form';
import { SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp } from '@react-navigation/native';
import GenericForm from '@/components/form/GenericForm';
import LoginEmail from '@/components/login/LoginEmail';
import LoginPassword from '@/components/login/LoginPassword';
import ProgressBar from '@/components/signup/progressBar/ProgressBar';
import { authNavigations, colors, feedTabNavigations } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { useFunnel } from '@/hooks/useFunnel';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { loginSchema } from '@/schema';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

enum LOGIN_STEPS {
	EMAIL = 'email',
	PASSWORD = 'password',
}

export interface LoginInputs {
	email: string;
	password: string;
}

interface LoginScreenProps {
	navigation: NavigationProp<AuthStackParamList>;
}

function LoginScreen({ navigation }: LoginScreenProps) {
	const loginSteps = [LOGIN_STEPS.EMAIL, LOGIN_STEPS.PASSWORD] as const;
	const [Funnel, activeStepIndex, setStep] = useFunnel(loginSteps, {
		initialStep: LOGIN_STEPS.EMAIL,
	});
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

	const { loginMutation } = useAuth();

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

		// login(
		// 	{ email, password },
		// 	{
		// 		onSuccess: data => {
		// 			console.log('로그인 성공:', data);
		// 			if (data.data.email) {
		// 				navigation.navigate(feedTabNavigations.FEED_HOME);
		// 			}
		// 		},
		// 		onError: (error: any) => {
		// 			console.error('로그인 실패:', error);
		// 			navigation.navigate(authNavigations.AUTH_HOME);
		// 		},
		// 	},
		// );
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
			<ProgressBar
				activeStepIndex={activeStepIndex}
				stepLength={loginSteps.length}
			/>
			<GenericForm<LoginInputs> formOptions={loginFormOptions}>
				<Funnel>
					<Funnel.Step name={LOGIN_STEPS.EMAIL}>
						<LoginEmail onNext={() => setStep(LOGIN_STEPS.PASSWORD)} />
					</Funnel.Step>
					<Funnel.Step name={LOGIN_STEPS.PASSWORD}>
						<LoginPassword onSubmit={onSubmit} />
					</Funnel.Step>
				</Funnel>
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
