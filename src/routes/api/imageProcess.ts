import express from 'express';
import { Response, Request } from 'express';
import fs from 'fs';
import path from 'path';
import processImg from '../../imageApp';

const imageProcess = express.Router();

const defaultImages = [
  'fjord',
  'encenadaport',
  'icelandwaterfall',
  'palmtunnel',
  'santamonica',
];

imageProcess.get('/', async (req: Request, res: Response): Promise<void | unknown> => {
  if (!fs.existsSync('./images/resized')) {
    fs.mkdir('./images/resized', (err) => {
      if (err) throw err;
    });
  }

  const qImageName: string = req.query.image as string;
  const qImageWidth: string = req.query.width as string;
  const qImageHeight: string = req.query.height as string;
  const parsedImageWidth: number = parseInt(qImageWidth);
  const parsedImageHeight: number = parseInt(qImageHeight);

  if (
    !defaultImages.includes(qImageName) ||
    parsedImageWidth < 0 ||
    isNaN(parsedImageWidth) ||
    parsedImageHeight < 0 ||
    isNaN(parsedImageHeight)
  ) {
    return res.status(400).send('Please enter valid data');
  }

  await processImg(qImageName, parsedImageWidth, parsedImageHeight);
  res.sendFile(
    path.resolve('./images/resized') +
      `/${qImageName}_${qImageWidth}_${qImageHeight}.jpg`
  );
});

export default imageProcess;
