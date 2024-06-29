// Server에서 받아오는 데이터들의 타이핑 아래 참조.

type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

type Category = {
	[key in MarkerColor]: string;
};

interface ImageUri {
	id?: number;
	uri: string;
}

interface CHAT_ROOM {
	chatRoomId: number,
	leaderName: string,
	imageKey: string,
	partySubject: string,
	partyStatus: string,
	partyLocationAddress: string,
	partyStartTime: string,
	userCnt: number,
	partyMinParticipant: number,
	partyMaxParticipant: number,
	messageCnt: number
}

export type { ImageUri, CHAT_ROOM };
