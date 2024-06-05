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

const partyNavigations = {
	PARTY_HOME: 'PartyHome',
	PARTY_WRITE: 'PartyWrite',
	PARTY_DETAIL: 'PartyDetail',
	PARTY_SEARCH: 'PartySearch',
} as const;

const communityNavigations = {
	COMMUNITY_TOPTAB: 'CommunityTopTab',
	COMMUNITY_QUESTION: 'CommunityQuestion',
	COMMUNITY_QUESTION_DETAIL: 'CommunityQuestionDetail',
	COMMUNITY_QUESTION_WRITE: 'CommunityQuestionWrite',
	COMMUNITY_POSTING: 'CommunityPosting',
	COMMUNITY_POSTING_DETAIL: 'CommunityPostingDetail',
	COMMUNITY_POSTING_WRITE: 'CommunityPostingWrite',
	COMMUNITY_COMMENTS: 'CommunityComments',
} as const;

const myNavigations = {
	MY_PAGE_HOME: 'MyPageHome',
	EDIT_PROFILE: 'EditProfile',
	MY_WRITE_POST: 'MyWritePost',
	MY_PROFILE_IMAGE_EDIT: 'MyProfileImageEdit',
} as const;

const feedNavigations = {
	ALERT: 'Alert',
	CHAT_START: 'ChatStart',
	CHAT_HOME: 'ChatHome',
	CHAT: 'Chat',
	FEED_TAB: 'FeedTab',
} as const;

const userNavigations = {
	USER: 'User',
	USER_PROFILE: 'UserProfile',
	USER_PROFILE_IMAGE: 'UserProfileImage',
} as const;

export {
	authNavigations,
	feedTabNavigations,
	wishNavigations,
	communityNavigations,
	myNavigations,
	feedNavigations,
	partyNavigations,
	userNavigations,
};
