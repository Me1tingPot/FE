import { useQuery } from '@tanstack/react-query';
import {
	getArea,
	getChildArea,
	getParentArea,
	searchAreaByCoord,
} from '@/api/area';
import { queryKeys } from '@/constants';

// GET: 하위 지역 조회
function useGetChildArea(parentAreaId: string) {
	const { data, isSuccess, error, isError, isPending } = useQuery({
		queryKey: [queryKeys.AREA, parentAreaId],
		queryFn: () => getChildArea(parentAreaId),
	});

	if (error) {
		console.error(error);
	}

	return { data, isSuccess, isError, isPending };
}

// GET: 상위 지역 조회
function useGetParentArea(areaId: string) {
	const { data, isSuccess, error, isError, isPending } = useQuery({
		queryKey: [queryKeys.AREA, areaId],
		queryFn: () => getParentArea(areaId),
	});

	if (error) {
		console.error(error);
	}

	return { data, isSuccess, isError, isPending };
}

// GET: 좌표로 지역 조회
function useSearchAreaByCoord(latitude: number, longitude: number) {
	const { data, isSuccess, error, isError, isPending } = useQuery({
		queryKey: [queryKeys.AREA],
		queryFn: () => searchAreaByCoord({ latitude, longitude }),
	});

	if (error) {
		console.error(error);
	}

	return { data, isSuccess, isError, isPending };
}

// GET: 최상위 지역 조회
function useSearchArea() {
	const { data, isSuccess, error, isError, isPending } = useQuery({
		queryKey: [queryKeys.AREA],
		queryFn: () => getArea(),
	});

	if (error) {
		console.error(error);
	}

	return { data, isSuccess, isError, isPending };
}

function useArea() {
	return {
		useGetChildArea,
		useGetParentArea,
		useSearchAreaByCoord,
		useSearchArea,
	};
}

export default useArea;
