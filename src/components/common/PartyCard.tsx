import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface PartyCardProps {}

const PartyCard = ({}: PartyCardProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<Pressable
			style={({ pressed }) => [
				styles.container,
				pressed && styles.pressedContainer,
			]}
		>
			<View style={styles.contentContainer}>
				<View style={styles.badge}>
					<Text style={styles.badgeText}>모집 중</Text>
				</View>
				<View style={styles.imageContainer}>
					<Image
						source={require('@/assets/user-default.png')}
						width={45}
						height={45}
					/>
					<View style={styles.textContainer}>
						<Text style={styles.titleText} numberOfLines={2}>
							24회 전주국제영화제 뒤풀이 파티로 어서오세요 24회 전주국제영화제
							뒤풀이 파티로 어서오세요 24회 전주국제영화제 뒤풀이 파 어서오세요
						</Text>
						<Text style={styles.descText} numberOfLines={1}>
							전주월드컵경기장 (전주특별자치도 전주시 덕진구 기린대로 1055)
						</Text>
					</View>
				</View>
				<View style={styles.dividerContainer}>
					<View style={styles.divider} />
				</View>
				<View style={styles.detailInfoContainer}>
					<View style={styles.iconContainer}>
						<Ionicons name="happy" size={20} color={colors[theme].GRAY_500} />
						<Text style={styles.iconFont}>김용민</Text>
					</View>
					<View style={styles.iconContainer}>
						<Ionicons
							name="calendar"
							size={20}
							color={colors[theme].GRAY_500}
						/>
						<Text style={styles.iconFont}>2024/05/27</Text>
					</View>
					<View style={styles.iconContainer}>
						<Ionicons name="time" size={20} color={colors[theme].GRAY_500} />
						<Text style={styles.iconFont}>16:42</Text>
					</View>
					<View style={styles.iconContainer}>
						<Ionicons name="people" size={20} color={colors[theme].GRAY_500} />
						<Text style={styles.iconFont}>5 (4~8)</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			height: 160,
			backgroundColor: colors[theme].WHITE,
			borderRadius: 20,
			borderColor: colors[theme].EMERALD_500,
			borderWidth: 4,
			shadowColor: colors[theme].UNCHANGE_BLACK,
			shadowOffset: {
				width: 0,
				height: 8,
			},
			shadowOpacity: 0.2,
			shadowRadius: 8.65,
			elevation: 8,
		},
		pressedContainer: {
			backgroundColor: colors[theme].GRAY_100,
		},
		contentContainer: {
			flexDirection: 'column',
			justifyContent: 'center',
		},
		badge: {
			width: 50,
			height: 25,
			backgroundColor: colors[theme].EMERALD_500,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			top: 5,
			left: 8,
			borderRadius: 12,
			overflow: 'hidden',
		},
		badgeText: {
			color: colors[theme].WHITE,
			fontSize: 12,
		},
		imageContainer: {
			marginTop: 10,
			flexDirection: 'row',
			width: 260,
			gap: 10,
			paddingHorizontal: 10,
		},
		textContainer: {
			flexDirection: 'column',
			marginTop: 10,
		},
		titleText: {
			color: colors[theme].BLACK,
			fontFamily: 'Pretendard-Medium',
		},
		descText: {
			color: colors[theme].GRAY_500,
			fontFamily: 'Pretendard-Light',
			fontSize: 10,
		},
		dividerContainer: {
			alignItems: 'center',
			marginVertical: 10,
		},
		divider: {
			borderBottomWidth: 1,
			width: '90%',
			borderBottomColor: colors[theme].GRAY_200,
		},
		detailInfoContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
		},
		iconContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 2,
		},
		iconFont: {
			color: colors[theme].GRAY_500,
			fontSize: 13,
		},
	});

export default PartyCard;
