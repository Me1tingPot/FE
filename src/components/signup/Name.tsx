import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';

const Name = ({ onNext }: { onNext: () => void }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const { theme } = useThemeStore();
	const styles = styilng(theme);

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>이름을 적어주세요.</Text>
				<Text style={styles.description}>
					<Text style={styles.textPoint}>여권 상</Text>의 영문 이름이 필요해요!
				</Text>
			</View>

			<View>
				<CustomTextInput
					value={firstName}
					onChangeText={t => setFirstName(t)}
					placeholder="여권상의 영문 이름"
				/>
				<CustomTextInput
					value={lastName}
					onChangeText={t => setLastName(t)}
					placeholder="여권상의 영문 성"
				/>
			</View>

			<View>
				<Text style={[styles.textPoint, styles.title, styles.noticeText]}>
					왜 여권에 기재된 이름이 필요한가요?
				</Text>
				<Text style={[styles.description, styles.noticeText]}>
					온오프라인 만남에서 벌어질 수 있는 신분상의 도용이나 이로 인한 피해,
					로맨스 스캠 등 다양한 범죄를 예방하기 위해 국제적으로 통용되는
					신분증에 기재된 이름을 정확히 적어주세요.
				</Text>
			</View>

			<View style={styles.buttonPosition}>
				<CustomButton label="다음으로" onPress={onNext} variant={'filled'} />
			</View>
		</View>
	);
};

const styilng = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			gap: 20,

			paddingVertical: 50,
			paddingHorizontal: 40,
		},
		buttonPosition: {
			marginTop: 'auto',
		},
		title: {
			fontSize: 20,
			color: colors[theme].GRAY_700,
		},
		description: {
			marginTop: 10,

			fontSize: 14,
			color: colors[theme].GRAY_500,
		},
		noticeText: {
			fontSize: 12,
		},
		textPoint: {
			color: colors[theme].BLACK,
			fontWeight: 700,
		},
	});

export default Name;
