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

function emailVerifycationSchema() {
	return z
		.string({ required_error: '인증번호를 입력해주세요.' })
		.trim()
		.min(6, { message: '인증번호는 6자리 숫자입니다.' })
		.max(6, { message: '인증번호는 6자리 숫자입니다.' })
		.refine(
			(value: string) =>
				!isNaN(Number(value)) && Number.isInteger(Number(value)),
			{
				message: '인증번호는 6자리 숫자입니다.',
			},
		);
}

function nameSchema() {
	return z
		.string({ required_error: '이름은 문자/특수문자를 포함한 1~20자리입니다.' })
		.trim()
		.min(1, { message: '이름은 문자/특수문자를 포함한 1~20자리입니다.' })
		.max(20, { message: '이름은 문자/특수문자를 포함한 1~20자리입니다.' });
}

function genderSchema() {
	return z.string({ required_error: '성별을 선택해주세요.' });
}

function birthSchema() {
	return z
		.string({ required_error: '생년월일을 선택해주세요.' })
		.trim()
		.min(1, { message: '생년월일을 선택해주세요.' });
}

function languagesSchema() {
	return z.array(z.string());
}

function nationalitySchema() {
	return z.string({ required_error: '국적을 선택해주세요.' }).trim();
}

const profileImageSchema = z.object({
	imageKey: z
		.string({ required_error: '이미지 키가 필요합니다.' })
		.uuid({ message: '올바른 UUID 형식이 아닙니다.' }),
	thumbnail: z.boolean({ required_error: '썸네일 여부가 필요합니다.' }),
	sequence: z
		.number({ required_error: '시퀀스 번호가 필요합니다.' })
		.int({ message: '시퀀스 번호는 정수여야 합니다.' }),
});

function profileImagesSchema() {
	return z
		.array(profileImageSchema)
		.min(1, { message: '최소 1개의 프로필 이미지가 필요합니다.' });
}

export {
	passwordSchema,
	emailSchema,
	emailVerifycationSchema,
	nameSchema,
	genderSchema,
	birthSchema,
	languagesSchema,
	profileImagesSchema,
	nationalitySchema,
};
