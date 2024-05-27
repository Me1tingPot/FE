import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { getLocales } from 'react-native-localize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/constants';
import useModal from '@/hooks/useModal';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { MonthYear, changeEnMonth, isSameAsCurrentDate } from '@/utils';
import DateBox from './DateBox';
import DayOfWeeks from './DayOfWeeks';
import YearSelector from './YearSelector';

interface CalendarProps {
	monthYear: MonthYear;
	selectedDate: number;
	onPressDate: (date: number) => void;
	onChangeMonth: (increment: number) => void;
}

const Calendar = ({
	monthYear,
	onChangeMonth,
	selectedDate,
	onPressDate,
}: CalendarProps) => {
	const { month, year, lastDate, firstDayOfWeek } = monthYear;
	const { theme } = useThemeStore();
	const styles = styling(theme);
	const lng = getLocales()[0].languageCode;
	const yearSelector = useModal();

	const handleChangeYear = (selectYear: number) => {
		// 연도 바꿔줄수있음.
		// 1년 12달 (선택한 year에서 - 현재 year)를 뺴주고 12를 곱하면됨
		onChangeMonth((selectYear - year) * 12);
		yearSelector.hide();
	};

	return (
		<>
			<View style={styles.headerContainer}>
				<Pressable
					onPress={() => onChangeMonth(-1)}
					style={styles.monthButtonContainer}
				>
					<Ionicons name="arrow-back" size={25} color={colors[theme].BLACK} />
				</Pressable>
				<Pressable
					style={styles.monthYearContainer}
					onPress={yearSelector.show}
				>
					<Text style={styles.titleText}>
						{lng === 'ko' && `${year}년 ${month}월`}
						{lng === 'en' && `${year} ${changeEnMonth(year, month)}`}
					</Text>
					<MaterialIcons
						name="keyboard-arrow-down"
						size={20}
						color={colors[theme].GRAY_500}
					/>
				</Pressable>
				<Pressable
					onPress={() => onChangeMonth(1)}
					style={styles.monthButtonContainer}
				>
					<Ionicons
						name="arrow-forward"
						size={25}
						color={colors[theme].BLACK}
					/>
				</Pressable>
			</View>
			<DayOfWeeks />
			<View style={styles.bodyContainer}>
				{/* 총 표시할 날짜를 lastDate 만큼 */}
				{/* 수요일이 1일에 시작한다면, 일/월/화 만큼 3칸도 더 표시해주어야함. 더해줌. */}
				<FlatList
					data={Array.from({ length: lastDate + firstDayOfWeek }, (_, i) => ({
						id: i,
						date: i - firstDayOfWeek + 1,
					}))}
					renderItem={({ item }) => (
						<DateBox
							date={item.date}
							isToday={isSameAsCurrentDate(year, month, item.date)}
							selectedDate={selectedDate}
							onPressDate={onPressDate}
						/>
					)}
					keyExtractor={item => String(item.id)}
					// 1주일씩 표기 7칸
					numColumns={7}
				/>
			</View>
			<YearSelector
				isVisible={yearSelector.isVisible}
				currentYear={year}
				onChangeYear={handleChangeYear}
				hide={yearSelector.hide}
			/>
		</>
	);
};

const styling = (theme: ThemeMode) =>
	StyleSheet.create({
		headerContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginHorizontal: 25,
			marginVertical: 16,
		},
		monthYearContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			padding: 10,
		},
		monthButtonContainer: {
			padding: 10,
		},
		titleText: {
			fontSize: 18,
			fontWeight: '500',
			color: colors[theme].BLACK,
		},
		bodyContainer: {
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderBottomColor: colors[theme].GRAY_300,
			backgroundColor: colors[theme].GRAY_100,
		},
	});

export default Calendar;
