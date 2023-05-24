import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Exams:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  }]
});

const examSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type:String,
    required: true,
  },
  questions: [{
    id: {type: mongoose.Schema.Types.ObjectId,},
    text: String,
    options: [String]
  }]
});

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export const ExamModel = mongoose.models.Exam || mongoose.model('Exam', examSchema);
