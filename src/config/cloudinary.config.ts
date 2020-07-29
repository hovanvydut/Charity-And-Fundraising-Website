require('dotenv').config();
const cloudinary = require('cloudinary').v2;
import * as config from 'config';

const cloudinaryConfig = config.get('cloudinary');

cloudinary.config({
  cloud_name:
    'dgext7ewd' || process.env.CLOUDIANRY_NAME || cloudinaryConfig.name,
  api_key:
    '354796774142827' ||
    process.env.CLOUDIANRY_API_KEY ||
    cloudinaryConfig.api_key,
  api_secret:
    'LED5qjG68iato7AaukhhhblY2CI' ||
    process.env.CLOUDIANRY_API_SECRET ||
    cloudinaryConfig.api_secret,
});

export default cloudinary;
