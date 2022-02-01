import path from "path";
import fs from "fs";
// import sharp from "sharp";

export const uploadSingleImage = async (image, req, folder) => {
    const {filename, createReadStream} = await image;

    const {ext, name} = path.parse(filename);

    const stream = createReadStream();

    const fileName = `${Date.now()}-${name}.${ext}`;

    const pathName = path.join(
        `${__dirname}/../../public/images/${folder}/${fileName}`
    );

    await stream.pipe(fs.createWriteStream(pathName));

    const imageUrl = `${req.protocol}://${req.get(
        "host"
    )}/images/${folder}/${fileName}`;

    return imageUrl;
};

export const uploadMultipleImages = async (images, req, folder) => {
    let imagesArray = []

    await Promise.all(
        images.map(async (image) => {
            const imageUrl = await uploadSingleImage(image, req, "hotels");
            imagesArray.push(imageUrl)
        })
    );

    return imagesArray;
};
