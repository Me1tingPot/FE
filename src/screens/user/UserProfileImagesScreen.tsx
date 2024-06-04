import { useState } from 'react';
import {
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import { colors } from '@/constants';
import { UserProfileStackParamList } from '@/navigations/stack/UserProfileNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface UserProfileImagesScreenProps {
	navigation: NavigationProp<UserProfileStackParamList>;
}

const testImage1 =
	'https://images.unsplash.com/photo-1715509790057-a44470a63cc2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D';
const testImage2 =
	'https://images.unsplash.com/photo-1717416699048-421387c76fb3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8';
const testImage3 =
	'https://images.unsplash.com/photo-1715254934165-15112c612e76?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D';

const imageList = [testImage1, testImage2, testImage3];

function UserProfileImagesScreen({ navigation }: UserProfileImagesScreenProps) {
	const [selected, setSelected] = useState<number>(0);
	const { theme } = useThemeStore();
	const styles = styling(theme);

	const handleSelected = (id: number) => {
		setSelected(id);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.headerContainer}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={styles.back}
				>
					<Ionicons
						name="close-outline"
						size={30}
						color={colors[theme].BLACK}
					/>
				</TouchableOpacity>
				<View style={styles.imgConutContainer}>
					<Text style={styles.imgCount}>
						<Text style={styles.textRed}>1</Text>/3
					</Text>
				</View>
				<View style={[styles.back, { width: 30, height: 30 }]} />
			</View>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<Image source={{ uri: imageList[selected] }} style={styles.image} />
				<View style={styles.imagePreviewContainer}>
					{imageList.map((img, index) => (
						<TouchableOpacity onPress={() => handleSelected(index)} key={index}>
							<Image
								key={index}
								source={{ uri: img }}
								style={styles.imagePreview}
							/>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors[theme].WHITE,
		},
		contentContainer: {
			flex: 1,
		},
		headerContainer: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			paddingVertical: 20,
			paddingHorizontal: 10,
			width: '100%',
		},
		back: {
			marginRight: 'auto',
		},
		imgConutContainer: {
			flex: 1,
		},
		imgCount: {
			alignSelf: 'center',
			fontSize: 25,
			fontFamily: 'Pretendard-Light',
		},
		textRed: {
			color: colors[theme].RED_500,
		},
		image: {
			width: '100%',
			height: '60%',
		},
		imagePreviewContainer: {
			flexDirection: 'row',
			gap: 10,
			padding: 20,
			marginTop: 'auto',
		},
		imagePreview: {
			width: 70,
			height: 70,
		},
	});

export default UserProfileImagesScreen;
