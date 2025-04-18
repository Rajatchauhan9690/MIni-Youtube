import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //File has been upload successfully to cloudinary
    console.log("File is Successfully uploaded to cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Delete the local file if upload fails
    console.error("Error uploading file to Cloudinary", error.message);
    return null;
  }
};
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error.message);
  }
};
export { uploadOnCloudinary, deleteFromCloudinary };
