import { resources } from '@/locales/i18n.config';

declare module 'i18next' {
	interface CustomTypeOptions {
		resources: (typeof resources)['ko'];
	}
}
