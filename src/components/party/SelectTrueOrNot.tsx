import { CompoundOption } from '../common/CompoundOption';

interface SelectTrueOrNotProps {
	isVisible: boolean;
	hideOption: () => void;
	setter: (value: boolean) => void;
}

function SelectTrueOrNot({
	isVisible,
	hideOption,
	setter,
}: SelectTrueOrNotProps) {
	return (
		<CompoundOption isVisible={isVisible} hideOption={hideOption}>
			<CompoundOption.Background>
				<CompoundOption.Container>
					<CompoundOption.Button
						onPress={() => {
							setter(true);
							hideOption();
						}}
					>
						예
					</CompoundOption.Button>
					<CompoundOption.Button
						onPress={() => {
							setter(false);
							hideOption();
						}}
					>
						아니오
					</CompoundOption.Button>
				</CompoundOption.Container>
			</CompoundOption.Background>
		</CompoundOption>
	);
}

export default SelectTrueOrNot;
