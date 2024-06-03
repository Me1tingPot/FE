import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { GestureResponderEvent } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@/components/common/CheckBox';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import Send from '../../../assets/images/Send.png';

interface InputBottomProps {
	id: number;
	isChecked: boolean;
	onPress: (event: GestureResponderEvent) => void;
	onPressCamera: () => void;
	comment: string;
	setComment: Dispatch<SetStateAction<string>>;
	onSubmit: () => void;
}

const InputBottom = ({
	id,
	isChecked,
	onPress,
	comment,
	setComment,
	onSubmit,
	onPressCamera,
}: InputBottomProps) => {
	const { t } = useTranslation();
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<View style={styles.inputContainer}>
			<View style={[styles.rowGap5, styles.anonymousContainer]}>
				<CheckBox
					isChecked={isChecked}
					onPress={onPress}
					children={<Text style={styles.anomynousText}>{`${t('익명')}`}</Text>}
				/>
			</View>
			<View style={[styles.rowGap10]}>
				<TouchableOpacity activeOpacity={0.8} onPress={onPressCamera}>
					<IonIcons
						name="camera-outline"
						color={colors[theme].GRAY_500}
						size={25}
					/>
				</TouchableOpacity>
				<View style={[styles.rowGap5, styles.inputLayout]}>
					<TextInput
						value={comment}
						onChangeText={t => setComment(t)}
						placeholderTextColor={colors[theme].GRAY_300}
						placeholder={`${t('댓글을 입력하세요')}`}
						style={styles.input}
					/>
					<TouchableOpacity activeOpacity={0.8} onPress={onSubmit}>
						<Image source={Send} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		inputContainer: {
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			width: '100%',
			padding: 20,
			backgroundColor: colors[theme].GRAY_100,
		},
		rowGap10: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center',
		},
		rowGap5: {
			display: 'flex',
			flexDirection: 'row',
			gap: 5,
			alignItems: 'center',
		},
		anonymousContainer: {
			marginLeft: 'auto',
		},
		anomynousText: {
			fontSize: 12,
			color: colors[theme].GRAY_700,
		},
		inputLayout: {
			flex: 1,
			padding: 10,
			borderRadius: 10,
			backgroundColor: colors[theme].WHITE,
		},
		input: {
			flex: 1,
			padding: 0,
			height: 20,
			color: colors[theme].BLACK,
		},
	});

export default InputBottom;
