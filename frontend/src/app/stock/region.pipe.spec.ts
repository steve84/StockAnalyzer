import { RegionPipe } from './region.pipe';

describe('RegionPipe', () => {
  it('create an instance', () => {
    const pipe = new RegionPipe('en-US');
    expect(pipe).toBeTruthy();
  });
});
