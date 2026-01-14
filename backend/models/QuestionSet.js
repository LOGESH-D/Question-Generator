import mongoose from "mongoose";

const qaSchema = new mongoose.Schema({
  question: String,
  idealAnswer: String,
  basedOn: String
});

const questionSetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true
  },
  level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true
  },
  questions: [qaSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("QuestionSet", questionSetSchema);
