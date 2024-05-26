import { Image, StyleSheet, Text, View } from 'react-native';

interface FeedHomeHeaderLeftProps {}

const FeedHomeHeaderLeft = ({}: FeedHomeHeaderLeftProps) => {
	return (
		<View style={styles.container}>
			<Image
				width={20}
				height={20}
				source={require('@/assets/Logo.png')}
				resizeMode="contain"
			/>
			<Text style={styles.text}>elting Pot</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	text: {
		marginLeft: 5,
		fontSize: 20,
		fontFamily: 'Pretendard-Bold',
	},
});

export default FeedHomeHeaderLeft;
