import { useEffect, useState } from 'react';
import { USER_PROFILE_DATA_TYPES } from '@/types/api/types';
import useUser from './queries/useUser';

function useGetUserData() {
	const [userData, setUserData] = useState<USER_PROFILE_DATA_TYPES | {}>({});
	const { getUserProfile } = useUser();

	useEffect(() => {
		if (getUserProfile?.data?.data) {
			setUserData(getUserProfile.data.data);
		}
	}, [getUserProfile?.data?.data]);

	return { ...userData };
}

export default useGetUserData;
