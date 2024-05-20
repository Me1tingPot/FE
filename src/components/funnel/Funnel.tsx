import { Children, ReactElement, isValidElement } from 'react';
import { FunnelProps, NonEmptyArray, StepProps } from '../../types/funnelType';

// Step 컴포넌트. 자식 컴포넌트를 렌더링한다.
export const Step = <T extends NonEmptyArray<string>>({
	children,
}: StepProps<T>) => {
	return <>{children}</>;
};

// Funnel 컴포넌트
export const Funnel = <Steps extends NonEmptyArray<string>>({
	steps,
	step,
	children,
}: FunnelProps<Steps>) => {
	// 1. 자식들이 유효한 react element인가?
	// 2. Funnel의 자식(Step)들의 name이 steps에 포함되는가?
	// 위 조건에 모두 해당되는 요소들만 validChildren으로 간주한다.
	const validChildren = Children.toArray(children)
		.filter(isValidElement)
		.filter(i =>
			steps.includes((i.props as Partial<StepProps<Steps>>).name ?? ''),
		) as Array<ReactElement<StepProps<Steps>>>;

	// 유효한 자식들 중에서 그들의 name과 현재 step이 일치하는 요소만 targetStep으로 설정
	const targetStep = validChildren.find(child => child.props.name === step);

	if (targetStep === null) {
		throw new Error(`${step} 스텝 컴포넌트를 찾지 못했음`);
	}

	// 스텝이 일치하는 자식 요소 하나만 렌더링
	return <>{targetStep}</>;
};
