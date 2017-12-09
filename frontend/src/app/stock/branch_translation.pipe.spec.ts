import { BranchTranslationPipe } from './branch_translation.pipe';

describe('BranchTranslationPipe', () => {
  it('create an instance', () => {
    const pipe = new BranchTranslationPipe('en_US');
    expect(pipe).toBeTruthy();
  });
});
