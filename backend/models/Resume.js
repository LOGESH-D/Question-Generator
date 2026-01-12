import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fileName: String,
  cloudinaryUrl: String,
  cloudinaryId: String,
  resumeText: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Resume", resumeSchema);
