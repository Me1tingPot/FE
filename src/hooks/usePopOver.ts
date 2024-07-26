import { useState } from 'react';

const usePopOver = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handlePopOver = () => {
		setIsOpen(prev => !prev);
	};

	return { handlePopOver, isOpen };
};

export default usePopOver;
