import Resume from "../models/Resume.js";
import { extractResumeTextFromBuffer } from "../utils/resumeParser.js";
import { uploadResumeToCloudinary } from "../utils/cloudinaryUpload.js";

export const uploadResume = async (req, res) => {
  try {
    console.log("Controller reached");

    if (!req.file) {
      return res.status(400).json({ message: "No resume uploaded" });
    }

    const resumeText = await extractResumeTextFromBuffer(req.file.buffer);

    const cloudinaryResult = await uploadResumeToCloudinary(
      req.file.buffer,
      req.file.originalname
    );

    const resume = await Resume.create({
      userId: req.user.id,
      fileName: req.file.originalname,
      cloudinaryUrl: cloudinaryResult.secure_url,
      cloudinaryId: cloudinaryResult.public_id,
      resumeText
    });

    return res.status(201).json({
      message: "Resume uploaded successfully",
      resumeId: resume._id,
      resumeUrl: resume.cloudinaryUrl
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: err.message });
  }
};
