// Server에서 받아오는 데이터들의 타이핑 아래 참조.

type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

type Category = {
	[key in MarkerColor]: string;
};

interface ImageUri {
	id?: number;
	uri: string;
}

interface Marker {
	id: number;
	latitude: number;
	longitude: number;
	color: MarkerColor;
	score: number;
}

export type { ImageUri };
