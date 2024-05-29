import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	FlatList,
	Image,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MultipleGradientBgTextInput from '@/components/community/MultipleGradientBgTextInput';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

const imageList = ['/', '/', '/', '/', '/', '/', '/', '/', '/', '/'];

type CommunityPostingScreenProps = {};

const CommunityPostingScreen = ({}: CommunityPostingScreenProps) => {
	const [input, setInput] = useState('');
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const { t } = useTranslation();

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.keyBoardView}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
			>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<MultipleGradientBgTextInput
						value={input}
						onChangeText={t => setInput(t)}
						placeholder={t(`다양한 이야기를 공유해보세요!`)}
					/>
				</ScrollView>
				<View style={[styles.displayRow, styles.imageContainer]}>
					<FlatList
						data={imageList}
						horizontal
						renderItem={({ item, index }) => (
							<View key={index} style={styles.imageLayout}>
								<Image source={{ uri: item }} style={styles.image} />
								<Pressable
									style={styles.imageDelete}
									onPress={() => console.log('click')}
								>
									<Ionicons name="close-outline" size={15} />
								</Pressable>
							</View>
						)}
					/>
				</View>
				<View style={[styles.displayRow, styles.menu]}>
					<Pressable onPress={() => console.log('click')}>
						<Ionicons
							name="camera-outline"
							color={colors[theme].GRAY_400}
							size={30}
						/>
					</Pressable>
					<View style={[styles.displayRow]}>
						<Pressable
							style={styles.menuBtn}
							onPress={() => console.log('click')}
						>
							<Text style={styles.menuText}>{t('임시저장')}</Text>
						</Pressable>
						<Pressable
							style={styles.menuBtn}
							onPress={() => console.log('click')}
						>
							<Text style={styles.menuText}>{t('게시하기')}</Text>
						</Pressable>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		displayRow: {
			display: 'flex',
			flexDirection: 'row',
			gap: 10,
		},
		keyBoardView: {
			flex: 1,
		},
		contentContainer: {
			display: 'flex',
			flexDirection: 'column',
			flex: 1,
			gap: 10,
			paddingHorizontal: 25,
			paddingTop: 20,
		},
		image: {
			position: 'relative',
			width: 45,
			height: 45,
			backgroundColor: colors[theme].GRAY_300,
		},
		imageContainer: {
			paddingHorizontal: 25,
			paddingVertical: 10,
		},
		imageLayout: {
			marginRight: 10,
		},
		menu: {
			paddingTop: 15,
			paddingBottom: 20,
			paddingHorizontal: 15,
			justifyContent: 'space-between',
			backgroundColor: colors[theme].WHITE,
			opacity: 0.8,
		},
		menuBtn: {
			padding: 5,
			borderWidth: 1,
			borderColor: colors[theme].GRAY_400,
		},
		menuText: {
			color: colors[theme].GRAY_700,
			fontFamily: 'Pretendard-Light',
		},
		imageDelete: {
			position: 'absolute',
			top: 0,
			right: 0,
			padding: 2,
		},
	});

export default CommunityPostingScreen;
