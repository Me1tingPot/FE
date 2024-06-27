function getDetailsDate(dateString: Date | string) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return { year, month, day };
}

function getDateWithSeparator(
	dateString: Date | string,
	separator: string = '',
) {
	const { year, month, day } = getDetailsDate(dateString);

	return [
		String(year),
		String(month).padStart(2, '0'),
		String(day).padStart(2, '0'),
	].join(separator);
}

function getDateLocaleFormat(
	dateString: Date | string,
	separator: string = '.',
) {
	const { year, month, day } = getDetailsDate(dateString);
	const paddedMonth = month.toString().padStart(2, '0');
	const paddedDay = day.toString().padStart(2, '0');

	return `${year}${separator}${paddedMonth}${separator}${paddedDay}`;
}

// CALENDAR
function getMonthYearDetails(initialDate: Date) {
	const month = initialDate.getMonth() + 1;
	const year = initialDate.getFullYear();
	const startDate = new Date(`${year}-${month}`);
	// 매달 1일이 무슨 요일 (몇번쨰에 시작하는지)
	const firstDayOfWeek = startDate.getDay();
	// 마지막 날짜가 무엇인지
	const lastDateString = String(
		new Date(
			initialDate.getFullYear(),
			initialDate.getMonth() + 1,
			0,
		).getDate(),
	);

	const lastDate = Number(lastDateString);

	return { month, year, startDate, firstDayOfWeek, lastDate };
}

type MonthYear = {
	month: number;
	year: number;
	startDate: Date;
	firstDayOfWeek: number;
	lastDate: number;
};
// 이전 달 or 다음 달로 넘겼을 떄도 위와 같은 정보가 필요.
function getNewMonthYear(prevData: MonthYear, increment: number) {
	const newMonthYear = new Date(
		prevData.startDate.setMonth(prevData.startDate.getMonth() + increment),
	);

	return getMonthYearDetails(newMonthYear);
}

function isSameAsCurrentDate(year: number, month: number, date: number) {
	const currentDate = getDateWithSeparator(new Date());
	const inputDate = `${year}${String(month).padStart(2, '0')}${String(date).padStart(2, '0')}`;

	return currentDate === inputDate;
}

function changeEnMonth(year: number, month: number) {
	const date = new Date(year, month - 1);
	return date.toLocaleString('en-US', { month: 'long' });
}

export type { MonthYear };

export {
	getDetailsDate,
	getDateWithSeparator,
	getDateLocaleFormat,
	getMonthYearDetails,
	getNewMonthYear,
	isSameAsCurrentDate,
	changeEnMonth,
};
