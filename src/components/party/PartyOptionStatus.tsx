import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import CheckBox from '../common/CheckBox';
import CustomButton from '../common/CustomButton';

interface PartyOptionStatusProps {
	selectedStatus: string | null;
	setSelectedStatus: (section: string) => void;
	handleCloseModal: () => void;
}

function PartyOptionStatus({
	selectedStatus,
	setSelectedStatus,
	handleCloseModal,
}: PartyOptionStatusProps) {
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	const handlePress = (item: string) => {
		setSelectedItem(item);
		setSelectedStatus(item);
	};

	const handleNavigateToNextSection = () => {
		if (selectedItem) {
			handleCloseModal();
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>모집 상태</Text>
			</View>
			{['모집 중', '모집 예정', '마감'].map((item, idx) => (
				<CheckBox
					key={idx}
					size="l"
					isChecked={selectedStatus === item}
					onChangeCheck={() => handlePress(item)}
				>
					<Text style={styles.checkboxText}>{item}</Text>
				</CheckBox>
			))}
			<View style={styles.buttonContainer}>
				<CustomButton
					label="완료"
					variant="outlined"
					onPress={handleNavigateToNextSection}
					size="medium"
				/>
			</View>
		</View>
	);
}

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		container: {
			flexDirection: 'column',
			justifyContent: 'center',
			paddingHorizontal: 40,
			gap: 20,
		},
		header: {
			marginBottom: 10,
			paddingVertical: 10,
			borderRadius: 5,
		},
		headerText: {
			color: colors[theme].GRAY_700,
			fontSize: 16,
			fontWeight: 'bold',
		},
		checkboxText: {
			fontSize: 16,
			color: colors[theme].GRAY_700,
			marginLeft: 5,
		},
		buttonContainer: {
			marginTop: 20,
		},
	});

export default PartyOptionStatus;
