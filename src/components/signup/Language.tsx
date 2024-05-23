import { useFormContext } from 'react-hook-form';
import { Button, Text, View } from 'react-native';

type LanguageProps = {
	onNext: () => void;
	onSubmit: (data: any) => Promise<void>;
};

const Language = ({ onNext, onSubmit }: LanguageProps) => {
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useFormContext();
	return (
		<View>
			<Text>언어 및 국적 입력</Text>
			<Button title="다음" onPress={handleSubmit(onSubmit)} />
		</View>
	);
};

export default Language;
