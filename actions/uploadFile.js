"use server";

import cloudinary from "@/lib/cloudinary";


export const uploadFile = async (file, folder) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      folder: `socialhop/${folder}`,
      resource_type: "auto",
    });
    console.log("File uploaded successfully:", res);
    return res;
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      error: "Failed to upload",
    };
  }

//   const fileInputRef = React.useRef(null);
//   const [isUploading, setIsUploading] = React.useState(false);
//   const [isImageLoading, setIsImageLoading] = React.useState(false);
//   const [url, setUrl] = React.useState('');
//   const  upload = async (file, folder) =>{
//     console.log('check image uplad now videos',file );
//     console.log('check image folder',folder );
//      const formData = new FormData();
//               formData.append('file', file);
  
//               try {
//                   const res = await fetch('/api/upload', {
//                       method: 'POST',
//                       body: formData,
//                   });
  
//                   const result = await res.json();
//                   setUrl(result.url);
//                   setIsUploading(false)
//                   setIsImageLoading(true)
//                   console.log('Uploaded image URL:', result.url);
//               } catch (error) {
//                   console.error('Error uploading file:', error);
//               }
//   }
//   upload(file, folder)
//  console.log('upload image', url);
 
//   try {
//     Upload file to Cloudinary
//     const res = await cloudinary.uploader.upload(file, {
//       folder: `socialhop/${folder}`,
//       resource_type: "auto",
//     });
//     console.log("file uploaded successfully");
//     return res;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return {
//       error: "Failed to upload",
//     };
//   }
};

export const deleteFile = async (public_id) => {
  try {
    // Delete image from Cloudinary
    const res = cld.v2.uploader.destroy(public_id, (error, result) => {
      if (error) {
        console.error("Error deleting image:", error);
      } else {
        console.log("file deleted successfully");
        return result;
      }
    });
    return res;
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to delete",
    };
  }
};
