import { FieldError, UseFormSetValue } from 'react-hook-form';
import { Button, Text, View } from 'react-native';
import { SignupInputs } from '@/screens/auth/SignUpScreen';

type LanguageProps = {
	onNext: () => void;
	setValue: UseFormSetValue<SignupInputs>;
	error?: FieldError | undefined;
};

const Language = ({ onNext }: LanguageProps) => {
	return (
		<View>
			<Text>언어 및 국적 입력</Text>
			<Button title="다음" onPress={onNext} />
		</View>
	);
};

export default Language;
