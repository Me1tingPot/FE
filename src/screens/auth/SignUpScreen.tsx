import { SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
import { authNavigations, colors } from '@/constants';
import { useFunnel } from '@/hooks/useFunnel';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { AuthHomeScreenProps } from './AuthHomeScreen';

enum FUNNEL_STEPS {
	SEX = 'sex',
	NAME = 'name',
	EMAIL = 'email',
	PASSWORD = 'password',
	BIRTH = 'birth',
	LOCATION = 'location',
	FACE_IMG = 'faceImg',
	LANGUAGE = 'language',
}

export interface SignupInputs {
	sex: '여성' | '남성';
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordCheck: string;
	birth: string;
	location: string;
	faceImgs: string[];
	local: string;
	language: string;
}

function SignUpScreen({ navigation }: AuthHomeScreenProps) {
	const funnelSteps = [
		FUNNEL_STEPS.SEX,
		FUNNEL_STEPS.NAME,
		FUNNEL_STEPS.EMAIL,
		FUNNEL_STEPS.PASSWORD,
		FUNNEL_STEPS.BIRTH,
		FUNNEL_STEPS.LOCATION,
		FUNNEL_STEPS.FACE_IMG,
		FUNNEL_STEPS.LANGUAGE,
	] as const;
	const [Funnel, activeStepIndex, setStep] = useFunnel(funnelSteps, {
		initialStep: FUNNEL_STEPS.SEX,
	});
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const onSubmit = async (data: any) => {
		try {
			console.log('입력받은 데이터: ', data);
		} catch (error) {
			console.error(error);
		}
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
			<GenericForm<SignupInputs>>
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
						<Birth onNext={() => setStep(FUNNEL_STEPS.LOCATION)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.LOCATION}>
						<Location onNext={() => setStep(FUNNEL_STEPS.FACE_IMG)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.FACE_IMG}>
						<FaceImg onNext={() => setStep(FUNNEL_STEPS.LANGUAGE)} />
					</Funnel.Step>
					<Funnel.Step name={FUNNEL_STEPS.LANGUAGE}>
						<Language
							onNext={() => navigation.replace(authNavigations.SIGN_UP_FINISH)}
							onSubmit={onSubmit}
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
