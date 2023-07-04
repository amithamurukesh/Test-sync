import { PassThrough } from 'stream';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getConfig } from '../../config/config';
import { log } from '../../utils/logger';

const AWS_BUCKET_NAME = `${getConfig().s3Bucket}`;

// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-explicit-any
const uploadToS3 = async (stream: PassThrough): Promise<void> => {
  const s3 = new S3Client({ region: getConfig().awsRegion });

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: `commercetools_backup_${Date.now()}.json`,
    Body: stream,
  };

  try {
    const upload = new Upload({ client: s3, params });

    stream.end();

    await upload.done();
  } catch (error) {
    log.error(`S3 service error: ${error.message}`);
  }
};

export { uploadToS3 };
