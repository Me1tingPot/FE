import { MutationOptions, useMutation } from '@tanstack/react-query';
import { uploadImages } from '@/api';

function useMutateImages(mutationOptions?: MutationOptions) {
	return useMutation({
		mutationFn: uploadImages,
	});
}

export default useMutateImages;
