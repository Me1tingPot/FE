import { http, HttpResponse } from 'msw';

export const handlers = [
	http.post('http://localhost:3030/images', () => {
		return HttpResponse.json({
			timestamp: '2024-06-03T19:02:46.235Z',
			code: 'string',
			status: '100 CONTINUE',
			detail: 'string',
			data: {
				uploadUrl:
					'/Users/kim-yongmin/Library/Developer/CoreSimulator/Devices/D6FC302F-1EC1-4258-8FD4-4AA0049970DB/data/Containers/Data/Application/3291F431-DC0B-4832-94C7-5D61F9DB63DA/tmp/react-native-image-crop-picker/9E4D90A4-FD90-41C0-896F-C59BD6D28084.jpg',
				fileKey: 'string',
			},
		});
	}),
];
