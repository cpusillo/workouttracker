const db = require("../models");

module.exports = function (app) {

// Route to get all workouts
app.get("/api/workouts", (req, res) => {
  db.Exercise.find({}).then(data => {
    // Loop through the returned data and continually add to the totalduration
    data.forEach(exercise => {
        var total = 0;
        exercise.exercises.forEach(e => {
            total += e.duration;
        });
        exercise.totalDuration = total;
    });
    // Actually returns the data from our db
    res.json(data);
      }).catch(err => {
        console.log(err);
      });
  });
  
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

  // Route to get the workouts range 
  app.get("/api/workouts/range", (req, res) => {
    db.Exercise.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    });

});

}