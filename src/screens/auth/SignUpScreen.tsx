import { UseFormProps } from 'react-hook-form';
import { SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { zodResolver } from '@hookform/resolvers/zod';
import GenericForm from '@/components/form/GenericForm';
import {
	Birth,
	Email,
	ProfileImage,
	Language,
	Name,
	Password,
	Gender,
} from '@/components/signup';
import EmailVerification from '@/components/signup/EmailVerification';
import ProgressBar from '@/components/signup/progressBar/ProgressBar';
import { colors, feedTabNavigations } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { useFunnel } from '@/hooks/useFunnel';
import { signupSchema } from '@/schema';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { IMAGE_DTO } from '@/types/api/types';
import { AuthHomeScreenProps } from './AuthHomeScreen';

export enum FUNNEL_STEPS {
	GENDER = 'gender',
	NAME = 'name',
	EMAIL = 'email',
	EMAIL_VERIFICATION = 'emailVerifycation',
	PASSWORD = 'password',
	BIRTH = 'birth',
	FACE_IMG = 'faceImg',
	LANGUAGE = 'language',
}

export enum GENDER {
	FEMALE = 'FEMALE',
	MALE = 'MALE',
	UNKNOWN = 'UNKNOWN',
}

export interface SignupInputs {
	gender: GENDER;
	name: string;
	email: string;
	emailVerifycation: string;
	password: string;
	checkPassword: string;
	birth: string;
	profileImages: IMAGE_DTO[];
	nationality: string;
	languages: string[];
}

function SignUpScreen({ navigation }: AuthHomeScreenProps) {
	const funnelSteps = [
		FUNNEL_STEPS.GENDER,
		FUNNEL_STEPS.NAME,
		FUNNEL_STEPS.EMAIL,
		FUNNEL_STEPS.EMAIL_VERIFICATION,
		FUNNEL_STEPS.PASSWORD,
		FUNNEL_STEPS.BIRTH,
		FUNNEL_STEPS.FACE_IMG,
		FUNNEL_STEPS.LANGUAGE,
	] as const;
	const [Funnel, activeStepIndex, setStep] = useFunnel(funnelSteps, {
		initialStep: FUNNEL_STEPS.GENDER,
	});
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const signupFormOptions: UseFormProps<SignupInputs> = {
		defaultValues: {
			email: '',
			password: '',
			name: '',
			gender: undefined,
			birth: '',
			nationality: '',
			languages: [],
			profileImages: [],
		},
		resolver: zodResolver(signupSchema),
		mode: 'onChange',
		reValidateMode: 'onChange',
	};
	const { loginMutation, signUpMutation } = useAuth();

	const onSubmit = async (data: SignupInputs) => {
		console.log('입력 받은 데이터: ', data);
		const {
			gender,
			name,
			password,
			birth,
			languages,
			nationality,
			profileImages,
			email,
		} = data;
		signUpMutation.mutate(
			{
				gender,
				name,
				password,
				birth,
				languages,
				profileImages,
				nationality,
				email,
			},
			{
				onSuccess: () => {
					loginMutation.mutate(
						{ email, password },
						{
							onSuccess: () =>
								navigation.navigate(feedTabNavigations.FEED_HOME),
						},
					);
				},
				onError: error => {
					Toast.show({
						type: 'error',
						text1: error.response?.data.message || '회원가입 에러발생',
						visibilityTime: 2000,
						position: 'bottom',
					});
				},
			},
		);
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
				stepLength={funnelSteps.length}
			/>
			<GenericForm<SignupInputs> formOptions={signupFormOptions}>
				<Funnel>
					<Funnel.Step name={FUNNEL_STEPS.GENDER}>
						<Gender onNext={() => setStep(FUNNEL_STEPS.NAME)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.NAME}>
						<Name onNext={() => setStep(FUNNEL_STEPS.EMAIL)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.EMAIL}>
						<Email onNext={() => setStep(FUNNEL_STEPS.EMAIL_VERIFICATION)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.EMAIL_VERIFICATION}>
						<EmailVerification onNext={() => setStep(FUNNEL_STEPS.PASSWORD)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.PASSWORD}>
						<Password onNext={() => setStep(FUNNEL_STEPS.BIRTH)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.BIRTH}>
						<Birth onNext={() => setStep(FUNNEL_STEPS.FACE_IMG)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.FACE_IMG}>
						<ProfileImage onNext={() => setStep(FUNNEL_STEPS.LANGUAGE)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.LANGUAGE}>
						<Language
							onSubmit={onSubmit}
							isPending={signUpMutation.isPending}
						/>
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

export default SignUpScreen;
