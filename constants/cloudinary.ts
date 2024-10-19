import cloudinary from 'cloudinary';

const CloudinaryProvider = cloudinary.v2;
CloudinaryProvider.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default CloudinaryProvider;