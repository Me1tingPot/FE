import { useState } from 'react';

type StepProps<Step> = {
	name: Readonly<Step>;
	children: React.ReactNode;
};

type FunnelProps<Step> = {
	children: Array<React.ReactElement<StepProps<Step>>>;
};

const useFunnel = <Step extends string>(defaultStep: Step, lastStep: Step) => {
	const [step, setStep] = useState<Step>(defaultStep);

	const Step = (props: StepProps<Step>): React.ReactElement => {
		return <>{props.children}</>;
	};

	const Funnel = ({ children }: FunnelProps<Step>) => {
		const targetStep = children.find(
			childStep => childStep.props.name === step,
		);

		if (!targetStep) throw new Error(`현재 ${step}과 일치하지 않습니다.`);

		return targetStep;
	};

	Funnel.step = Step;

	const prevStep = () => {
		if (step !== '1') {
			setStep(String(Number(step) - 1) as Step);
		}
	};

	const nextStep = () => {
		if (String(Number(step) + 1) < lastStep) {
			setStep(String(Number(step) + 1) as Step);
		}
	};

	return {
		Funnel,
		Step,
		setStep,
		currentStep: step,
		prevStep,
		nextStep,
	} as const;
};

export default useFunnel;
