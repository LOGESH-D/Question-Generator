import cloudinary from "./cloudinary.js";

export const uploadResumeToCloudinary = async (buffer, filename) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      {
        folder: "resumes",
        resource_type: "raw",
        public_id: filename
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};
