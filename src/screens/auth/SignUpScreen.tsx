import { StyleSheet } from 'react-native';
import { Page1, Page2, Page3, Page4, Page5 } from '@/components/signup';
import { authNavigations } from '@/constants';
import { useFunnel } from '@/hooks/useFunnel';
import { AuthHomeScreenProps } from './AuthHomeScreen';

function SignUpScreen({ navigation }: AuthHomeScreenProps) {
	const funnelSteps = ['1', '2', '3', '4', '5'] as const;
	const [Funnel, activeStepIndex, setStep] = useFunnel(funnelSteps, {
		initialStep: '1',
	});
	return (
		<Funnel>
			<Funnel.Step name={'1'}>
				<Page1 onNext={() => setStep('2')} />
			</Funnel.Step>
			<Funnel.Step name={'2'}>
				<Page2 onNext={() => setStep('3')} />
			</Funnel.Step>
			<Funnel.Step name={'3'}>
				<Page3 onNext={() => setStep('4')} />
			</Funnel.Step>
			<Funnel.Step name={'4'}>
				<Page4 onNext={() => setStep('5')} />
			</Funnel.Step>
			<Funnel.Step name={'5'}>
				<Page5 onNext={() => navigation.navigate(authNavigations.AUTH_HOME)} />
			</Funnel.Step>
		</Funnel>
	);
}

const styles = StyleSheet.create({});

export default SignUpScreen;
