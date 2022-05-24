import sharp from 'sharp';
import path from 'path';
import { response } from 'express';

const imgPath = path.resolve('./images/full');
const resizedImgPath = path.resolve('./images/resized');

const processImg = async (
  imgName: string,
  width: number,
  height: number
): Promise<void | string> => {
  try {
    await sharp(path.join(`${imgPath}`, `${imgName}.jpg`))
      .resize(width, height)
      .toFile(`${resizedImgPath}/${imgName}_${width}_${height}.jpg`);
    return 'processed';
  } catch (error) {
    response.send(error);
  }
};
export default processImg;
