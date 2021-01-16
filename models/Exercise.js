const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
    exercises: [
        {
          type: {
            type: String,
            required: true
          },
          name: {
            type: String,
            required: true
          },
          weight: {
            type: Number
          },
          sets: {
            type: Number
          },
          reps: {
            type: Number
          },
          duration: {
            type: Number
          },
          distance: {
            type: Number
          }
      }
    ],
    totalDuration: {
      type: Number,
      default: 0,
    }
  });
  
  const Exercise = mongoose.model("Exercise", ExerciseSchema);
  
  module.exports = Exercise;