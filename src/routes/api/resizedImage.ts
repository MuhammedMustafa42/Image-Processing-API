import express from 'express';
import { Response, Request } from 'express';
import path from 'path';

const resizedImage = express.Router();

const defaultImages = [
  'fjord',
  'encenadaport',
  'icelandwaterfall',
  'palmtunnel',
  'santamonica',
];

//the endpoint that shows the processed images
resizedImage.get(
  '/',
  async (req: Request, res: Response): Promise<void | unknown> => {
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

    res.sendFile(
      path.resolve('./images/resized') +
        `/${qImageName}_${qImageWidth}_${qImageHeight}.jpg`
    );
  }
);

export default resizedImage;
