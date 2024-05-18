import { initReactI18next } from 'react-i18next';
// 현재 폰 언어 확인
import { getLocales } from 'react-native-localize';
import i18n from 'i18next';
import { en, ko } from './translations';

export const resources = {
	en: {
		translation: en,
	},
	ko: {
		translation: ko,
	},
};

i18n.use(initReactI18next).init({
	resources, // 현재 사용할 언어 모듈
	lng: getLocales()[0].languageCode, // 앱에서 사용할 기본언어 설정
	fallbackLng: 'en', // lng를 사용할수 없을때 기본언어
	supportedLngs: ['en', 'ko'], // 허용할 언어배열
	compatibilityJSON: 'v3',
	interpolation: {
		escapeValue: false, // XSS 주입을 피하기 위해 설정
	},
});

export default i18n;
