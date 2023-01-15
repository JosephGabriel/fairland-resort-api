import { Request, Response } from "express";
import { randomBytes } from "crypto";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".")[1];

    const newFileName = randomBytes(64).toString("hex");

    cb(null, `${newFileName}.${extension}`);
  },
});

export const upload = multer({ storage: storage });

export const uploadUserAvatar = (req: Request, res: Response) => {
  const { file } = req;

  return res.json({
    url: `${req.protocol}://${req.get("host")}/${file.filename}`,
  });
};

export const uploadHotelImages = (req: Request, res: Response) => {
  const { files } = req;

  //@ts-ignore
  const photos = files.photos.map((f) => ({
    url: `${req.protocol}://${req.get("host")}/${f.filename}`,
  }));

  //@ts-ignore
  const thumbnail = files.thumbnail.map((f) => ({
    url: `${req.protocol}://${req.get("host")}/${f.filename}`,
  }));

  //@ts-ignore
  const logo = files.logo.map((f) => ({
    url: `${req.protocol}://${req.get("host")}/${f.filename}`,
  }));

  return res.json({
    logo,
    thumbnail,
    photos,
  });
};

export const deleteUploadedFile = async (file) => {
  try {
    const filename = file.split("/images/")[1];

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
        const filename = file.split("/images/")[1];

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
