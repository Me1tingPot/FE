import React from 'react';
import {
	Image,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ImageUri, ThemeMode } from '@/types';

interface PreviewImageListProps {
	imageUris: ImageUri[];
	onDelete?: (uri: string) => void;
}

const PreviewImageList = ({ imageUris, onDelete }: PreviewImageListProps) => {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<View style={styles.container}>
				{imageUris.map(({ uri }, index) => {
					return (
						<Pressable style={styles.imageContainer}>
							<Image
								key={index}
								resizeMode="cover"
								source={{
									uri: `${
										Platform.OS === 'ios'
											? 'http://localhost:3030'
											: 'http://10.0.2.2:3030'
									}/${uri}`,
								}}
								style={styles.image}
							/>
							<Pressable
								style={[styles.imageButton, styles.deleteButton]}
								onPress={() => onDelete && onDelete(uri)}
							>
								<Ionicons name="close" size={16} color={colors[theme].WHITE} />
							</Pressable>
						</Pressable>
					);
				})}
			</View>
		</ScrollView>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			paddingHorizontal: 15,
			gap: 15,
		},
		imageContainer: {
			width: 70,
			height: 70,
		},
		image: {
			width: '100%',
			height: '100%',
		},
		imageButton: {
			position: 'absolute',
			backgroundColor: colors[theme].BLACK,
		},
		deleteButton: {
			top: 0,
			right: 0,
		},
	});

export default PreviewImageList;
