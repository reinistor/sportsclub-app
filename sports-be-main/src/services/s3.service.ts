import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

require('dotenv').config({ path: `.env` });

@Injectable()
export class S3Service {
  bucketName = process.env.AWS_S3_BUCKET;
  secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
  accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;

  s3 = new AWS.S3({
    credentials: {
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    },
    region: 'us-east-1',
    signatureVersion: 'v4',
  });

  async uploadBase664File(base64: string, userId: string, folder: string) {
    const base64Data = Buffer.from(
      base64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

    const type = base64.split(';')[0].split('/')[1];

    const params = {
      Bucket: this.bucketName,
      Key: `${folder}/${userId}.${type}`,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    };

    let key = '';
    try {
      const { Key } = await this.s3.upload(params).promise();
      key = Key;
    } catch (error) {
      console.log(error);
    }
    return key;
  }

  async deleteFile(fileKey: string) {
    fileKey = decodeURIComponent(fileKey);
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    try {
      await this.s3.headObject(params).promise();
      await this.s3.deleteObject(params).promise();
      return { fileKey };
    } catch (e) {
      console.log('S3 Delete Error: ', JSON.stringify(e));
      return { message: `Error when deleting file '${fileKey}'` };
    }
  }

  signGetURL(fileKey: string) {
    try {
      const signParams = {
        Bucket: this.bucketName,
        Key: fileKey,
      };
      const url = this.s3.getSignedUrl('getObject', signParams);
      return url;
    } catch (e) {
      console.log('S3 Sign GET URL Error: ', JSON.stringify(e));
      return null;
    }
  }
}
