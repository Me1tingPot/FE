import { z } from 'zod';
import { emailSchema, passwordSchema } from './schemas';

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

const signupSchema = z.object({
	email: emailSchema(),
	password: passwordSchema(),
});

export { loginSchema, signupSchema };
