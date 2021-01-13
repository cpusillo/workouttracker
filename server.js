const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
var path = require('path');


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workouttracker";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

// Serve our root route
app.get("/", (req, res) => {
  res.send(index.html);
});

// Server our exercise route
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"));
});

// Show all workouts in the database
app.get("/api/workouts", (req, res) => {
  db.workouts.find({}, (err,data) => {
    if (err) console.log(err);
    res.json(data);
  });
})

// Insert an entry into the database
app.post("/api/workouts", ({ body }, res) => {
  // Save the request body as an object called book
   const exercise = body; // This includes the title and the author and the created
  db.workouts.insert(exercise, (err, data) => {
    if (err) console.log(err);
    res.json(exercise)
});
});


app.listen(3000, () => {
    console.log("App running on port 3000!");
  });
  