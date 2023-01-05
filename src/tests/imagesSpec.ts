import { changeImageSize } from '../routes/api/images';
import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs';

describe('Test changeImageSize function', () => {
  const outputImagePath = path.join(
    __dirname,
    '..',
    '..',
    'images',
    'thumbnails',
    'fjord-250-250.jpg'
  );

  afterAll(async () => {
    await fsPromises.unlink(outputImagePath);
  });

  it('should successfully create a resized image of the specified image', async () => {
    await changeImageSize('fjord', 250, 250);
    expect(fs.existsSync(outputImagePath)).toBeTrue;
  });
});
