import { useCallback, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import InputBottom from '@/components/community/detail/InputBottom';
import CommentsView from '@/components/community/detail/comment/CommentsView';
import CameraOrLibrary from '@/components/signup/CameraOrLibrary';
import { colors } from '@/constants';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

interface CommunityCommentsScreenProps {
	route: {
		params: {
			id: number;
		};
	};
}

function CommunityCommentsScreen({ route }: CommunityCommentsScreenProps) {
	const { id } = route.params;
	const [isChecked, setIsChecked] = useState(false);
	const [comment, setComment] = useState('');
	const [refreshing, setRefreshing] = useState(false);
	const [files, setFiles] = useState<string[]>([]);

	const { theme } = useThemeStore();
	const styles = styling(theme);
	const modal = useModal();
	usePermission('CAMERA');
	usePermission('PHOTO');

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	const onSubmit = () => {
		console.log(comment, '익명 유무: ', isChecked);
	};

	const cameraOptions: CameraOptions = {
		cameraType: 'front',
		mediaType: 'photo',
	};

	const libraryOptions: ImageLibraryOptions = {
		selectionLimit: 3,
		mediaType: 'photo',
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.keyboardView}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
			>
				<ScrollView
					contentContainerStyle={styles.contentContainer}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							colors={[colors[theme].BLACK]}
							tintColor={colors[theme].BLACK}
						/>
					}
				>
					<View style={styles.commentLayout}>
						{new Array(3).fill(null).map((_, idx) => (
							<CommentsView key={idx} />
						))}
					</View>
				</ScrollView>
				<InputBottom
					id={id}
					isChecked={isChecked}
					onPress={() => setIsChecked(prev => !prev)}
					comment={comment}
					setComment={setComment}
					onSubmit={onSubmit}
					onPressCamera={modal.show}
				/>
			</KeyboardAvoidingView>
			<CameraOrLibrary
				isVisible={modal.isVisible}
				hideOption={modal.hide}
				cameraOptions={cameraOptions}
				libraryOptions={libraryOptions}
				setFiles={setFiles}
			/>
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
			gap: 10,
			paddingVertical: 10,
			paddingHorizontal: 20,
		},
		keyboardView: {
			flex: 1,
		},
		commentLayout: {
			gap: 10,
			paddingHorizontal: 10,
		},
	});

export default CommunityCommentsScreen;
