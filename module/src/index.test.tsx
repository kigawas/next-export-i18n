import { i18n as userland } from './../../i18n/index';
import index from './index';
import { I18N } from './types';



jest.mock('./../../i18n/index', () => {
	return {
		__esModule: true,
		i18n: {
			translations: {
				mock: { title: 'mock' },
				foo: { title: 'bar' }
			},
			defaultLang: 'mock',
		} as any,
	};
});
// we can not use this for the actual mock due to hositing
const mockedData: any = {
	translations: { mock: { title: 'mock' }, foo: { title: 'bar' } },
	defaultLang: 'mock',
};


beforeEach(() => {
	jest.resetModules();
	// reset values before each test
	const translations = { mock: { type: 'mock' } };
	userland['defaultLang'] = mockedData['defaultLang'];
	userland['translations'] = mockedData['translations'] as unknown as any;
});


describe('The main file returns ', () => {
	it(`the data from 'i18n/index.js'`, async () => {
		const i18nObj = index() as I18N;
		expect(i18nObj).toStrictEqual(mockedData);
	});

});

describe('The main file throws an error if ', () => {

	it('there are not translations set', async () => {
		userland['translations'] = {} as unknown as any;
		expect(() => {
			index();
		}).toThrow(`Missing translations. Did you import and add the tranlations in 'i18n/index.js'`);
	});

	it('the defined default language is not present in the translations object', async () => {
		userland['defaultLang'] = 'invalid';
		expect(() => {
			index();
		}).toThrow(`Invalid default language 'invalid'. Check your 'defaultLang' in 'i18n/index.js'?`);
	});

	it('the default language is not set', async () => {
		userland['defaultLang'] = '';
		expect(() => {
			index();
		}).toThrow(`Missing default language. Did you set 'defaultLang' in 'i18n/index.js'?`);
	});


});
