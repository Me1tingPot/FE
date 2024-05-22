import { FieldValues, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
	name: string;
	email: string;
	password: string;
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

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<SignupInputs>();

	const onSubmit = async () => {
		try {
		} catch (e) {}
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
			<Funnel>
				<Funnel.Step name={'sex'}>
					<Sex
						onNext={() => setStep('name')}
						setValue={setValue}
						error={errors.sex}
					/>
				</Funnel.Step>
				<Funnel.Step name={'name'}>
					<Name
						onNext={() => setStep('email')}
						register={register}
						error={errors.name}
					/>
				</Funnel.Step>
				<Funnel.Step name={'email'}>
					<Email
						onNext={() => setStep('password')}
						register={register}
						error={errors.email}
					/>
				</Funnel.Step>
				<Funnel.Step name={'password'}>
					<Password
						onNext={() => setStep('birth')}
						register={register}
						error={errors.password}
					/>
				</Funnel.Step>
				<Funnel.Step name={'birth'}>
					<Birth
						onNext={() => setStep('location')}
						setValue={setValue}
						error={errors.birth}
					/>
				</Funnel.Step>
				<Funnel.Step name={'location'}>
					<Location
						onNext={() => setStep('faceImg')}
						setValue={setValue}
						error={errors.location}
					/>
				</Funnel.Step>
				<Funnel.Step name={'faceImg'}>
					<FaceImg
						onNext={() => setStep('language')}
						setValue={setValue}
						error={errors.faceImgs}
					/>
				</Funnel.Step>
				<Funnel.Step name={'language'}>
					<Language
						onNext={() => setStep('finish')}
						setValue={setValue}
						error={errors.language}
					/>
				</Funnel.Step>
				<Funnel.Step name={'finish'}>
					<Finish onNext={() => navigation.replace(authNavigations.LOGIN)} />
				</Funnel.Step>
			</Funnel>
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
