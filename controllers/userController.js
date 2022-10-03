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
  //Delete to remove user by its _id
  deleteUser(req, res) {
    User.findByIdAndRemove({ _id: req.params.userId })
      .then((deletedUser) => {
        if (!deletedUser) {
          res.status(404).json({
            message: "No user found with that Id",
          });
        } else {
          res.json(deletedUser);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  // BONUS: remove a user's associated thoughts when deleted

  //Add a new friend to a user's friend list
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        //push to add friend to array
        $push: {
          friends: req.params.friendId,
        },
      }
    )
      .then((addedFriend) => {
        if (!addedFriend) {
          res.status(404).json({
            message: "Cannot add friend. No user found with that Id",
          });
        } else {
          res.json(addedFriend);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  //Delete to remove a friend from a user's friend list
  deleteFriend(req, res) {
    //Find the user that wants to remove friend
    User.findOne({ _id: req.params.userId }).then((userData) => {
      //if userId doesn't exists show the message
      if (!userData) {
        res.status(404).json({
          message: "No user found with that Id",
        });
        //if user does exist, then we can delete the friend if they exist
      } else {
        User.findOneAndRemove({ friends: req.params.friendId })
          .then((removedFriend) => {
            if (!removedFriend) {
              res.status(404).json({
                message: "This friend does not exist.",
              });
            } else {
              res.json(removedFriend);
            }
          })
          .catch((err) => res.status(500).json(err));
      }
    });
  },
};
