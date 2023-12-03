import { GraphQLError } from 'graphql';
import fs from 'fs/promises';
import path from 'path';

export const uploadImage = async (request: Request, image: File) => {
  try {
    const fileArrayBuffer = await image.arrayBuffer();

    const imageName = `${new Date().getTime()}-${image.name}`;

    await fs.writeFile(
      path.join('uploads', imageName),
      Buffer.from(fileArrayBuffer)
    );

    return `${request.headers.get('host')}/${imageName}`;
  } catch (error) {
    console.log(error);

    throw new GraphQLError(
      'Não foi possivel fazer upload da imagem, tente mais tarde!'
    );
  }
};

export const deleteUploadedFile = async (file) => {
  try {
    const filename = file.split('/images/')[1];

    const filePath = `${__dirname}/../../public/images/${filename}`;

    await fs.unlink(filePath);
  } catch (err) {
    console.error(err);

    throw new GraphQLError(
      'Não foi possivel fazer upload da imagem, tente mais tarde!'
    );
  }
};
