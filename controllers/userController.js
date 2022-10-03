//User model
const User = require("../models/User");

//Route Methods
module.exports = {
  //Get all users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //Get single user w/ _id - populate thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts", "friends")
      .then((user) => {
        if (!user) {
          res.status(404).json({
            message: "No user found with that Id",
          });
        } else {
          res.json(user);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  //Create new user
  createUser(req, res) {
    User.create(req.body)
      .then((newUserData) => res.json(newUserData))
      .catch((err) => res.status(500).json(err));
  },
  //Update user w/ _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          res.status(404).json({
            message: "No user found with that Id",
          });
        } else {
          res.json(updatedUser);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  //delete to remove user by its _id
  deleteUser(req, res) {},
  // BONUS: remove a user's associated thoughts when deleted

  //Post to add a new friend to a user's friend list
  addFriend(req, res) {},
  //delete to remove a friend from a user's friend list
  deleteFriend(req, res) {},
};
