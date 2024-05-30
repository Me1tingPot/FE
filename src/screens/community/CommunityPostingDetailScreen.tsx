import { Text } from 'react-native';

type CommunityPostingDetailScreenProps = {
	route: {
		params: {
			id: number;
		};
	};
};

const CommunityPostingDetailScreen = ({
	route,
}: CommunityPostingDetailScreenProps) => {
	const { id } = route.params;

	return <Text>CommunityPostingDetailScreen | postId: {id}</Text>;
};

export default CommunityPostingDetailScreen;
