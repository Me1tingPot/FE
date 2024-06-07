import { UseFormProps } from 'react-hook-form';
import { SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { zodResolver } from '@hookform/resolvers/zod';
import GenericForm from '@/components/form/GenericForm';
import {
	Birth,
	Email,
	FaceImg,
	Location,
	Language,
	Name,
	Password,
	Sex,
} from '@/components/signup';
import ProgressBar from '@/components/signup/progressBar/ProgressBar';
import { authNavigations, colors, feedTabNavigations } from '@/constants';
import { useSignup } from '@/hooks/queries/useAuth';
import { useFunnel } from '@/hooks/useFunnel';
import { signupSchema } from '@/schema';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { IMAGE_DTO } from '@/types/api/types';
import { AuthHomeScreenProps } from './AuthHomeScreen';

enum FUNNEL_STEPS {
	SEX = 'sex',
	NAME = 'name',
	EMAIL = 'email',
	PASSWORD = 'password',
	BIRTH = 'birth',
	// LOCATION = 'location',
	FACE_IMG = 'faceImg',
	LANGUAGE = 'language',
}

export interface SignupInputs {
	sex: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordCheck: string;
	birth: string;
	faceImgs: IMAGE_DTO[];
	local: string;
	languages: string[];
}

function SignUpScreen({ navigation }: AuthHomeScreenProps) {
	const funnelSteps = [
		FUNNEL_STEPS.SEX,
		FUNNEL_STEPS.NAME,
		FUNNEL_STEPS.EMAIL,
		FUNNEL_STEPS.PASSWORD,
		FUNNEL_STEPS.BIRTH,
		FUNNEL_STEPS.FACE_IMG,
		FUNNEL_STEPS.LANGUAGE,
	] as const;
	const [Funnel, activeStepIndex, setStep] = useFunnel(funnelSteps, {
		initialStep: FUNNEL_STEPS.SEX,
	});
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const signupFormOptions: UseFormProps<SignupInputs> = {
		resolver: zodResolver(signupSchema),
		mode: 'onChange',
		reValidateMode: 'onChange',
	};

	const { mutate: signup, isPending } = useSignup();

	const onSubmit = async (data: SignupInputs) => {
		const {
			sex: gender,
			firstName,
			lastName,
			password,
			birth,
			languages,
			local: nationality,
			faceImgs: profileImages,
			email: username,
		} = data;
		const name = lastName + firstName;
		signup(
			{
				gender,
				name,
				password,
				birth,
				languages,
				profileImages,
				nationality,
				username,
			},
			{
				onSuccess: data => {
					console.log('회원가입 성공:', data);
					if (data.data.email) {
						navigation.navigate(feedTabNavigations.FEED_HOME);
					}
				},
				onError: (error: any) => {
					console.error('회원가입 실패:', error);
					navigation.navigate(authNavigations.AUTH_HOME);
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
					<Funnel.Step name={FUNNEL_STEPS.SEX}>
						<Sex onNext={() => setStep(FUNNEL_STEPS.NAME)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.NAME}>
						<Name onNext={() => setStep(FUNNEL_STEPS.EMAIL)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.EMAIL}>
						<Email onNext={() => setStep(FUNNEL_STEPS.PASSWORD)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.PASSWORD}>
						<Password onNext={() => setStep(FUNNEL_STEPS.BIRTH)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.BIRTH}>
						<Birth onNext={() => setStep(FUNNEL_STEPS.FACE_IMG)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.FACE_IMG}>
						<FaceImg onNext={() => setStep(FUNNEL_STEPS.LANGUAGE)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.LANGUAGE}>
						<Language onSubmit={onSubmit} isPending={isPending} />
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
