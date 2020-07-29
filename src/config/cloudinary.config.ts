require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dgext7ewd' || process.env.CLOUDIANRY_NAME,
  api_key: '354796774142827' || process.env.CLOUDIANRY_API_KEY,
  api_secret:
    'LED5qjG68iato7AaukhhhblY2CI' || process.env.CLOUDIANRY_API_SECRET,
});

export default cloudinary;
