import { ReactElement, ReactNode } from 'react';

// 최소 한 개 이상의 요소를 가지도록 하는 타입. 배열 요소 변경 불가능.
// T : 제네릭 타입. 어떤 타입이든 동작 가능하도록
export type NonEmptyArray<T> = readonly [T, ...T[]];

// Steps : 제네릭 타입. NonEmptyArray를 상속 받음. 배열 요소는 string type.
export interface FunnelProps<Steps extends NonEmptyArray<string>> {
	steps: Steps; // 타입의 배열
	step: Steps[number]; // 배열 요소 하나
	children: // Funnel은 Step 컴포넌트를 자식으로 갖는다.
	Array<ReactElement<StepProps<Steps>>> | ReactElement<StepProps<Steps>>;
}

// 각각의 Step 컴포넌트는 name 프로퍼티와 리액트 노드를 자식으로 갖는다.
export interface StepProps<Steps extends NonEmptyArray<string>> {
	name: Steps[number];
	children: ReactNode;
}
