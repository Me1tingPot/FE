import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';

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
	const Stack = createStackNavigator<CommunityStackParamList>();
	const { id } = route.params;

	return (
		<View>
			<Text>CommunityPostingDetailScreen | postId: {id}</Text>
		</View>
	);
};

export default CommunityPostingDetailScreen;
