import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const images = express.Router();

//function to change image size according to specified dimensions using sharp module
const changeImageSize = async (
  filename: string,
  width: number,
  height: number
): Promise<void> => {
  await sharp(
    path.join(__dirname, '..', '..', '..', 'images', 'full', `${filename}.jpg`)
  )
    .resize(width, height)
    .toFile(
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        'images',
        'thumbnails',
        `${filename}-${width}-${height}.jpg`
      )
    );
};

images.get('/', async (req: express.Request, res: express.Response) => {
  let errorMessage: string | null = null;

  //type conversion of query parameters
  const filename = String(req.query.filename);
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  const inputImagePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'images',
    'full',
    `${filename}.jpg`
  );
  const outputImagePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'images',
    'thumbnails',
    `${filename}-${width}-${height}.jpg`
  );

  //validation of input parameters
  if (req.query.filename == null) {
    errorMessage = 'filename param is missing or invalid';
  } else if (isNaN(width) || width == 0) {
    errorMessage = 'width param is missing or invalid';
  } else if (isNaN(height) || height == 0) {
    errorMessage = 'height param is missing or invalid';
  } else if (!fs.existsSync(inputImagePath)) {
    errorMessage = 'file not found';
  }

  //returns error messages if any
  if (errorMessage != null) {
    res
      .status(400)
      .send(
        `The following error occurred while processing your request: ${errorMessage}`
      );
  } else {
    //check if image with the exact same dimensions has already been processed. If so return already processed image, else process the image
    if (fs.existsSync(outputImagePath)) {
      res.status(200).sendFile(outputImagePath);
    } else {
      await changeImageSize(filename, width, height);
      res.status(200).sendFile(outputImagePath);
    }
  }
});

export {images, changeImageSize};
