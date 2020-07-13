const cloudinary = require('cloudinary').v2;
import * as config from 'config';

const cloudinaryConfig = config.get('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDIANRY_NAME || cloudinaryConfig.name,
  api_key: process.env.CLOUDIANRY_API_KEY || cloudinaryConfig.api_key,
  api_secret: process.env.CLOUDIANRY_API_SECRET || cloudinaryConfig.api_secret,
});

export default cloudinary;
