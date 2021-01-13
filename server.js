const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require('path');

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutsdb", { useNewUrlParser: true });

// Serve our root route
app.get("/", (req, res) => {
  res.send(index.html);
});

// Serve our exercise route
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});

// Serve our stats route
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"));
});

// Show all workouts
app.get("/api/workouts", (req, res) => {
  db.Exercise.find({}).then(data => {
      res.json(data);
  })
  .catch(err => {
      console.log(err)
  });
})

// Insert a workout
app.post("/api/workouts", ({ body },res) => {
  db.Exercise.create(body).then((data) => {
    res.json(data);
  }).catch(err => {
      console.log(err);
    });
})

// Make an update to the current _id
app.put("/api/workouts/:id", (req, res) => {
  db.Exercise.findByIdAndUpdate(
    { _id: req.params.id }, { exercises: req.body }
  ).then((data) => { 
    res.json(data);
  }).catch(err => { 
    console.log(err)
  });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("App running on port 3000!");
  });
  