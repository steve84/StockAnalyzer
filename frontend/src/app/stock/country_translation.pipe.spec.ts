import { CountryTranslationPipe } from './country_translation.pipe';

describe('CountryTranslationPipe', () => {
  it('create an instance', () => {
    const pipe = new CountryTranslationPipe('en_US');
    expect(pipe).toBeTruthy();
  });
});
