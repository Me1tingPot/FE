import { z } from 'zod';
import {
	birthSchema,
	emailSchema,
	emailVerifycationSchema,
	genderSchema,
	languagesSchema,
	nameSchema,
	nationalitySchema,
	passwordSchema,
	profileImagesSchema,
} from './schemas';

const loginSchema = z.object({
	email: z
		.string({ required_error: '이메일을 입력해주세요!' })
		.trim()
		.min(1, { message: '이메일은 필수 입력값입니다.' }),
	password: z
		.string({ required_error: '비밀번호를 입력해주세요!' })
		.trim()
		.min(1, { message: '비밀번호는 필수 입력값입니다.' }),
});

const signupSchema = z
	.object({
		email: emailSchema(),
		emailVerifycation: emailVerifycationSchema(),
		password: passwordSchema(),
		checkPassword: z
			.string({ required_error: '비밀번호를 입력해주세요.' })
			.trim()
			.min(1, { message: '비밀번호는 필수 입력값입니다.' }),
		name: nameSchema(),
		gender: genderSchema(),
		birth: birthSchema(),
		nationality: nationalitySchema(),
		languages: languagesSchema(),
		profileImages: profileImagesSchema(),
	})
	.superRefine(({ checkPassword, password }, ctx) => {
		if (checkPassword !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: '비밀번호가 일치하지 않습니다.',
				path: ['checkPassword'],
			});
		}
	});

export { loginSchema, signupSchema };
