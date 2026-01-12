import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  idealAnswer: String,
  basedOn: String
});

const questionSetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume"
  },
  level: String,
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("QuestionSet", questionSetSchema);
