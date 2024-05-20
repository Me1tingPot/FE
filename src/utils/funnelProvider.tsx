import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import useFunnel from '@/hooks/useFunnel';

export type FunnelContextValue = Pick<
	ReturnType<typeof useFunnel<Steps>>,
	'setStep' | 'currentStep' | 'Funnel' | 'prevStep' | 'nextStep'
>;

type Steps = '1' | '2' | '3' | '4' | '5';

const FunnelContext = createContext<FunnelContextValue | null>(null);
function FunnelProvider({ children }: PropsWithChildren) {
	const { setStep, currentStep, Funnel, prevStep, nextStep } = useFunnel<Steps>(
		'1',
		'5',
	);

	const memorizedValue = useMemo(
		() => ({
			setStep,
			currentStep,
			Funnel,
			prevStep,
			nextStep,
		}),
		[setStep, currentStep, Funnel, prevStep, nextStep],
	);

	return (
		<FunnelContext.Provider value={memorizedValue}>
			{children}
		</FunnelContext.Provider>
	);
}

export const useFunnelContext = () => {
	const funnelContext = useContext(FunnelContext);

	if (!funnelContext)
		throw new Error('부모 컴포넌트에서 FunnelContext를 사용할 수 없습니다.');

	return { ...funnelContext };
};

export default FunnelProvider;
