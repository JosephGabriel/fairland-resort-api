import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const hasFolder = fs.existsSync('uploads/');

    if (!hasFolder) {
      fs.mkdirSync('uploads/');
    }

    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.')[1];

    const newFileName = randomBytes(64).toString('hex');

    cb(null, `${newFileName}.${extension}`);
  },
});

export const upload = multer({ storage: storage });

export const uploadUserAvatar = (req: Request, res: Response) => {
  const { file } = req;

  return res.json({
    url: `${req.protocol}://${req.get('host')}/${file.filename}`,
  });
};

export const uploadImage = (req: Request, res: Response) => {
  const { file } = req;

  return res.json({
    url: `${req.protocol}://${req.get('host')}/${file.filename}`,
  });
};

export const uploadImages = (req: Request, res: Response) => {
  const { files } = req;

  const photos = files['files'].map(
    (f) => `${req.protocol}://${req.get('host')}/${f.filename}`
  );

  return res.json({
    url: photos,
  });
};

export const deleteUploadedFile = async (file) => {
  try {
    const filename = file.split('/images/')[1];

    const filePath = `${__dirname}/../../public/images/${filename}`;

    await fs.unlink(filePath, () => {
      return;
    });
  } catch (err) {
    console.error(err);
  }

  return;
};

export const deleteMultipleUploadedFiles = async (files) => {
  try {
    await Promise.all(
      files.map(async (file) => {
        const filename = file.split('/images/')[1];

        const filePath = `${__dirname}/../../public/images/${filename}`;

        await fs.unlink(filePath, () => {
          return;
        });
      })
    );
  } catch (err) {
    console.error(err);
  }

  return;
};
