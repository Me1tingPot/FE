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

	return `${year}${separator}${month}${separator}${day}`;
}

export { getDetailsDate, getDateWithSeparator, getDateLocaleFormat };
