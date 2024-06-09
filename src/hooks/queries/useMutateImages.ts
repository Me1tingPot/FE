import {
	MutationOptions,
	UseMutationOptions,
	useMutation,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { uploadImages, uploadProfileImages } from '@/api';

type CustomError = AxiosError<{
	message: string;
	statusCode: string;
	error: string;
}>;

type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
	UseMutationOptions<TData, CustomError, TVariables, unknown>,
	'mutationFn'
>;

function useMutateImages(mutationOptions?: MutationOptions) {
	return useMutation({
		mutationFn: uploadImages,
	});
}

function useMutateProfileImages(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: uploadProfileImages,
		...mutationOptions,
	});
}

function useImages() {
	const profileImagesMutation = useMutateProfileImages();
	const imagesMutation = useMutateImages();

	return {
		profileImagesMutation,
		imagesMutation,
	};
}

export default useImages;
