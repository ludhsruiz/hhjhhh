const router = require("express").Router()

const User = require('./../models/User.model')

router.get("/getAlluser", (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/getOneUser/:user_id/edit", (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/deleteUser/:user_id/delete", (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        //.then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/followUser/:user_id/follow", (req, res) => {

    const { user_id } = req.params
    const thisUser = req.body

    const promises = [User.findByIdAndUpdate(thisUser, { $addToSet: { following: user_id } }),
    User.findByIdAndUpdate(user_id, { $addToSet: { follower: thisUser } })]


    Promise
        .all(promises)
        .then((response) => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post("/unfollowUser/:user_id/unfollow", (req, res) => {

    const { user_id } = req.params
    const thisUser = req.body

    const promises = [User.findByIdAndDelete(thisUser, { $addToSet: { following: user_id } }),
    User.findByIdAndDelete(user_id, { $addToSet: { follower: thisUser } })]


    Promise
        .all(promises)
        .then((response) => res.json(response))
        .catch(err => res.status(500).json(err))

})
module.exports = router