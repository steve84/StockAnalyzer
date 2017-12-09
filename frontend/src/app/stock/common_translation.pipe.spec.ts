import { CommonTranslationPipe } from './common_translation.pipe';

describe('CommonTranslationPipe', () => {
  it('create an instance', () => {
    const pipe = new CommonTranslationPipe('en_US');
    expect(pipe).toBeTruthy();
  });
});
