import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;


// export const cld = globalThis.cloudinary || cloudinary;

// if(process.env.NODE_ENV !== 'production') globalThis.clouldnary = cld