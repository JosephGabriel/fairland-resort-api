import { S3 } from '@aws-sdk/client-s3';

export const s3 = new S3({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});
