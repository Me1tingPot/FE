import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CustomButton from '../common/CustomButton';

const iconList = [
	'camera-alt',
	'add-circle-outline',
	'add-circle-outline',
	'add-circle-outline',
];

type FaceImgProps = {
	onNext: () => void;
};

const FaceImg = ({ onNext }: FaceImgProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);

	return (
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={styles.flexGrow}
				data={[1]}
				renderItem={() => (
					<View style={styles.heightFull}>
						<View>
							<Text style={styles.title}>사진 등록</Text>
							<Text style={styles.description}>
								<Text style={styles.textPoint}>얼굴을 확인</Text>할 수 있는
								사진을 1장 이상 등록해주세요.
							</Text>
						</View>

						<FlatList
							columnWrapperStyle={{
								marginTop: 20,
								justifyContent: 'space-between',
							}}
							style={{ flex: 1 }}
							data={iconList}
							renderItem={({ item }) => (
								<TouchableOpacity style={styles.imageButton}>
									<MaterialIcons
										name={item}
										color={colors[theme].GRAY_400}
										size={25}
									/>
								</TouchableOpacity>
							)}
							numColumns={2}
						/>
					</View>
				)}
			/>
			<View style={styles.buttonPosition}>
				<Text style={styles.notice}>
					본 플랫폼은 타인 사진의 도용을 엄격히 금지합니다.{'\n'}이는 저작권
					침해에 해당되며, 심각한 경우 법적 처벌을 받을 수 있습니다.
				</Text>
				<CustomButton label="다음으로" onPress={onNext} variant={'filled'} />
			</View>
		</View>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
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
		textPoint: {
			color: colors[theme].GRAY_700,
			fontWeight: '700',
		},
		notice: {
			textAlign: 'center',
			fontSize: 10,
			color: colors[theme].GRAY_500,
			marginTop: 5,
			marginBottom: 10,
		},
		imageButton: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			width: '47%',
			height: 180,
			backgroundColor: colors[theme].WHITE,
			borderRadius: 20,
			borderWidth: 0.5,
			borderColor: colors[theme].GRAY_400,
		},
		heightFull: {
			height: '100%',
		},
		flexGrow: {
			flexGrow: 1,
		},
	});

export default FaceImg;
