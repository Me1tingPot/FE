import { z } from 'zod';
import { passwordPattern } from '@/constants/regex';

function passwordSchema() {
	return z
		.string()
		.trim()
		.min(8, {
			message: '비밀번호는 영문/숫자/특수문자 조합으로 8~20자리 입니다.',
		})
		.max(20, {
			message: '비밀번호는 영문/숫자/특수문자 조합으로 8~20자리 입니다.',
		})
		.regex(passwordPattern, {
			message: '비밀번호는 영문, 숫자를 필수로 하며 특수문자는 선택입니다.',
		});
}

function emailSchema() {
	return z
		.string({ required_error: '이메일을 입력해주세요.' })
		.trim()
		.email({ message: '올바른 이메일 형식이 아닙니다.' });
}

export { passwordSchema, emailSchema };
