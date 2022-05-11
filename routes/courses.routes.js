const router = require("express").Router()
const { response } = require("express")
const Course = require("../models/Course.model")


// ALL COURSES
router.get("/", (req, res) => {

  Course
    .find()
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err))
})

// ONE COURSE
router.get("/:id", (req, res) => {

  const { id } = req.params

  Course
    .findById(id)
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err))
})

// COURSE CREATE
router.post("/create", (req, res, next) => {

  const { name, description, date, img, location, price } = req.body

  Course
    .create({ name, description, date, img, location, price })
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err))
})

// COURSE EDIT
router.put("/:id/edit", (req, res) => {

    const { id } = req.params
    const { name, description, date, img, location, price } = req.body

  
    Course
      .findByIdAndUpdate(id, { name, description, date, img, location, price }, {new: true})
      .then(response => res.json(response))
      .catch(err =>res.status(500).json(err))
  })


// COURSE DELETE (( pay back ???? ))
router.delete("/:id/delete", (req, res ) => {

    const { id } = req.params

    Course
        .findByIdAndDelete(id)
        .then(() => { res.json(response)})
        .catch((err) => next(err))
})


// COURSE ATTENDANCE  (( pay button n add to user ))
router.put("/:id/attendance", (req, res) => {

    const { id } = req.params;
    // const thisUser = req.session.currentUser._id    ____ token

    Course
        .findByIdAndUpdate(thisUser, { $addToSet: { courses : id } })
        .then(response => { res.json(response)})
        .catch((err) => next(err))
})


// LEAVE COURSE    (( pay button n delete from user  ))
router.put("/:id/leave",  (req, res ) => {

    const { id } = req.params;
    // const thisUser = req.session.currentUser._id

    Course     
        .findByIdAndUpdate(thisUser, { $pull: { events : id } })
        .then(() => { res.json(response) })
        .catch((err) => next(err))
})





module.exports = router