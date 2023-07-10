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
  }],
  StudyCycle:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudyCycle'
  },
  Decks:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Deck'
  }]
});

const examSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  time:{
    type: String,
    required: true
  },
  correctAnswers:{
    type: Number,
    required: true
  },
  mistakes:{
    type: Number,
    required: true
  },
  questions: [{
    id: { type: mongoose.Schema.Types.ObjectId },
    text: String,
    img: String,
    options: [String],
    correctOption: { type: String, required: true }, 
  }],
});

const studyCycleSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subjects: [{
    name: {
      type: String,
      require: true
    },
    difficultyLevel: {
      type: String,
      require: true
    },
    levelHours: {
      type: Number,
      require: true
    },
    CompletedHours: {
      type: Number,
      require: true
    }
  }]
})
const deckSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cards:[{
    text:{
      type: String,
      require: true
    },
    correctAnswer:{
      type: String,
      require: true
    },
    time:{
      type: String
    }
  }]
})

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export const ExamModel = mongoose.models.Exam || mongoose.model('Exam', examSchema);
export const StudyCycleModel = mongoose.models.StudyCycle || mongoose.model('StudyCycle',studyCycleSchema);
export const DeckModel =
  mongoose.models.Deck || mongoose.model<Deck>('Deck', deckSchema);
