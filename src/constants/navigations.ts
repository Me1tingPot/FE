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

const partyNavigations = {
	PARTY_SAVE: 'PartySave',
	PARTY_RESERVATION: 'PartyReservation',
} as const;

export { authNavigations, feedTabNavigations, partyNavigations };
