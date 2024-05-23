import { SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GenericForm from '@/components/form/GenericForm';
import {
	Birth,
	Email,
	FaceImg,
	Finish,
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
		'sex',
		'name',
		'email',
		'password',
		'birth',
		'location',
		'faceImg',
		'language',
		'finish',
	] as const;
	const [Funnel, activeStepIndex, setStep] = useFunnel(funnelSteps, {
		initialStep: 'sex',
	});
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const onSubmit = async (data: any) => {
		try {
			console.log('입력받은 데이터: ', data);
			setStep('finish');
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
					<Funnel.Step name={'sex'}>
						<Sex onNext={() => setStep('name')} />
					</Funnel.Step>
					<Funnel.Step name={'name'}>
						<Name onNext={() => setStep('email')} />
					</Funnel.Step>
					<Funnel.Step name={'email'}>
						<Email onNext={() => setStep('password')} />
					</Funnel.Step>
					<Funnel.Step name={'password'}>
						<Password onNext={() => setStep('birth')} />
					</Funnel.Step>
					<Funnel.Step name={'birth'}>
						<Birth onNext={() => setStep('location')} />
					</Funnel.Step>
					<Funnel.Step name={'location'}>
						<Location onNext={() => setStep('faceImg')} />
					</Funnel.Step>
					<Funnel.Step name={'faceImg'}>
						<FaceImg onNext={() => setStep('language')} />
					</Funnel.Step>
					<Funnel.Step name={'language'}>
						<Language onNext={() => setStep('finish')} onSubmit={onSubmit} />
					</Funnel.Step>
					<Funnel.Step name={'finish'}>
						<Finish onNext={() => navigation.replace(authNavigations.LOGIN)} />
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
