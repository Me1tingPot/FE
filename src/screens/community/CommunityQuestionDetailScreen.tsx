import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { CommunityStackParamList } from '@/navigations/stack/CommunityStackNavigator';

type CommunityQuestionDetailScreenProps = {
	route: {
		params: {
			id: number;
		};
	};
};

const CommunityQuestionDetailScreen = ({
	route,
}: CommunityQuestionDetailScreenProps) => {
	const Stack = createStackNavigator<CommunityStackParamList>();
	const { id } = route.params;

	return (
		<View>
			<Text>CommunityQuestionDetailScreen | postId: {id}</Text>
		</View>
	);
};

export default CommunityQuestionDetailScreen;
