import { useMemo, useState } from 'react';
import { Funnel, Step } from '@/components/funnel/Funnel';
import { FunnelProps, NonEmptyArray, StepProps } from '@/types/index';

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<
	// 특정 속성만 제거한 타입 (Omit)
	// steps, step, children(Step) 제외
	// children(ReactNode type) 만을 속성으로 가짐
	FunnelProps<Steps>,
	'steps' | 'step'
>;

// FunnelComponent는 자식 요소를 가지고 있다.
// FunnelComponent는 그의 하위 컴포넌트 Step을 속성으로 가진다.
// ex. <Funnel.Step />
type FunnelComponent<Steps extends NonEmptyArray<string>> = ((
	props: RouteFunnelProps<Steps>,
) => JSX.Element) & { Step: (props: StepProps<Steps>) => JSX.Element };

export const useFunnel = <Steps extends NonEmptyArray<string>>(
	steps: Steps,
	options?: { initialStep?: Steps[number] },
): readonly [
	// useFunnel 반환타입
	FunnelComponent<Steps>, // 유저가 정의한 funnel 컴포넌트
	activeStepIndex: number, // 현재 활성화된 step의 index
	(step: Steps[number]) => void, // setStep. 현재 step을 변경하는 함수
] => {
	// initialStep이 있으면 그걸로 초기값 설정. 없으면 steps의 가장 첫번째 단계로 초기값 설정
	const [step, setStep] = useState(options?.initialStep ?? steps[0]);
	const activeStepIndex = steps.findIndex(s => s === step);

	// step이 변화할 때만 Funnel 컴포넌트를 새로 생성
	const FunnelComponent = useMemo(() => {
		return Object.assign(
			function RouteFunnel(props: RouteFunnelProps<Steps>) {
				return <Funnel<Steps> steps={steps} step={step} {...props} />;
			},
			// RouteFunnel 컴포넌트에 Step 속성을 추가.
			// ex. <Funnel.Step />
			{
				Step,
			},
		);
	}, [step]);

	// 리터럴 타입 유지. 변경 불가.
	return [FunnelComponent, activeStepIndex, setStep] as const;
};
