
import { useRouter } from 'next/router';
import i18n from './../index';
import { Dictionary, I18N } from '../types';
import useSelectedLanguage from './use-selected-language';


/**
 * Provides the t() function which returns the value stored for this given key (e.g. "i18n.ui.headline")
 * in the translation file.
 * The return value can be a string, a number, an array or an object.
 * In case there is no entry for this key, it returns the key.
 * @returns t(key: string): any function
 */
const useTranslation = ( ) => {
	const router = useRouter();
	let i18nObj: I18N;

	i18nObj = i18n() as I18N;

	const translations: Dictionary = i18nObj.translations;
	const defaultLang: string = i18nObj.defaultLang;  ;
	const { lang } = useSelectedLanguage();
	// const [lang] = useSelectedLanguage();

	return {
		/**
		 * Returns the value stored for this given key (e.g. "i18n.ui.headline")  in the translation file.
		 * The return value can be a string, a number, an array or an object.
		 * In case there is no entry for this key, it returns the key.
		 * @param key the key for looking up the translation
		 * @returns the value stored for this key, could be a string, a number, an array or an object
		 */
		t: (key: string): any => {
			let value: any = key
				.split('.')
				.reduce(
					(previous: any, current: string) =>
						(previous && previous[current]) || null,
					translations[lang]
			);
			return value || key;
		},
	};
};

export { useTranslation };
