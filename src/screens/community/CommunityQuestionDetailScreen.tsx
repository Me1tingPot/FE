import { useCallback, useEffect, useState } from 'react';
import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { NavigationProp } from '@react-navigation/native';
import InputBottom from '@/components/community/detail/InputBottom';
import PostContents from '@/components/community/detail/PostContents';
import PostInfo from '@/components/community/detail/PostInfo';
import UpdatePostOption from '@/components/community/detail/UpdatePostOption';
import CommentsView from '@/components/community/detail/comment/CommentsView';
import CameraOrLibrary from '@/components/signup/CameraOrLibrary';
import { colors } from '@/constants';
import useComment from '@/hooks/queries/useComment';
import useCommunity from '@/hooks/queries/useCommunity';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';
import usePostStore from '@/store/usePostStore';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';

type CommunityQuestionDetailScreenProps = {
	route: {
		params: {
			id: number;
		};
	};
	navigation: NavigationProp<CommunityStackParamList>;
};

function CommunityQuestionDetailScreen({
	route,
	navigation,
}: CommunityQuestionDetailScreenProps) {
	const [isChecked, setIsChecked] = useState(false);
	const [comment, setComment] = useState('');
	const [refreshing, setRefreshing] = useState(false);
	const [files, setFiles] = useState<string[]>([]);

	const { id } = route.params;
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const modal = useModal();
	const { setPost } = usePostStore();
	const questtionOption = useModal();

	const { useGetPostDetail } = useCommunity();
	const { useGetInfinitePostComments } = useComment();
	const { data, refetch, isPending } = useGetPostDetail(id);
	const {
		data: comments,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		refetch: refetchComment,
	} = useGetInfinitePostComments(id);

	usePermission('CAMERA');
	usePermission('PHOTO');

	useEffect(() => {
		if (data?.data) {
			setPost(data?.data);
		}
	}, [setPost, data]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			refetch();
			refetchComment();
			setRefreshing(false);
		}, 2000);
	}, []);

	const handleEndReached = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

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
				<FlatList
					data={comments?.pages.flatMap(page => page.data.commentsList)}
					contentContainerStyle={styles.contentContainer}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							colors={[colors[theme].BLACK]}
							tintColor={colors[theme].BLACK}
						/>
					}
					ListHeaderComponent={
						<View style={styles.postInfoContainer}>
							<PostInfo
								writerName={data?.data.name}
								postDate={data?.data.updatedAt}
								show={questtionOption.show}
							/>
							<PostContents
								title={data?.data.title}
								content={data?.data.content}
								commentCount={data?.data.commentCount}
							/>
						</View>
					}
					renderItem={({ item }) => <CommentsView comment={item} />}
					onEndReached={handleEndReached}
				/>
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
			<UpdatePostOption
				isVisible={questtionOption.isVisible}
				hideOption={questtionOption.hide}
				postType={'Question'}
				navigation={navigation}
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
			gap: 15,
			padding: 20,
		},
		keyboardView: {
			flex: 1,
		},
		postInfoContainer: {
			gap: 15,
		},
	});

export default CommunityQuestionDetailScreen;
