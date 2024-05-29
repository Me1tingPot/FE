const authNavigations = {
	AUTH_HOME: 'AuthHome',
	LOGIN: 'Login',
	SIGN_UP: 'SignUp',
	SIGN_UP_FINISH: 'SignUpFinish',
} as const;

const feedTabNavigations = {
	FEED_HOME: 'FeedHome',
	PARTY_HOME: 'PartyHome',
	WISH_HOME: 'WishHome',
	COMMUNITY_HOME: 'CommunityHome',
	MY_HOME: 'MyHome',
} as const;

const wishNavigations = {
	WISH_SAVE: 'WishSave',
	WISH_RESERVATION: 'WishReservation',
} as const;

const communityNavigations = {
	COMMUNITY_TOPTAB: 'CommunityTopTab',
	COMMUNITY_POSTING: 'CommunityPosting',
	COMMUNITY_QUESTION: 'CommunityQuestion',
	COMMUNITY_POSTING_DETAIL: 'CommunityPostingDetail',
} as const;

export {
	authNavigations,
	feedTabNavigations,
	wishNavigations,
	communityNavigations,
};
