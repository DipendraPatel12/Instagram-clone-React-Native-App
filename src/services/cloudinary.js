import { CLOUDINARY_CONFIG } from '../config/cloudinaryConfig';

export const uploadToCloudinary = async (fileUri, type = 'image/jpeg') => {
  console.log("called");

  const data = new FormData();

  const isImage = type === 'image/jpeg';

  data.append('file', {
    uri: fileUri,
    type: isImage ? 'image/jpeg' : 'video/mp4',
    name: isImage ? 'upload.jpg' : 'upload.mp4',
  });

  data.append('upload_preset', CLOUDINARY_CONFIG.UPLOAD_PRESET);

  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/${isImage ? 'image' : 'video'
    }/upload`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: data,

    });

    const result = await res.json();
    console.log("resu", result);

    return result.secure_url;
  } catch (error) {
    console.log('Cloudinary Upload Error:', error);
    return null;
  }
};