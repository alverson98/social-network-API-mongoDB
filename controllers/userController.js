//User model
const User = require("../models/User");

//Route Methods
module.exports = {
  //Get all users
  getAllUsers(req, res) {},
  //get single user by its _id and populate thought and friend data
  getSingleUser(req, res) {},
  //Post new user
  createUser(req, res) {},
  //put to update a user by its _id
  updateUser(req, res) {},
  //delete to remove user by its _id
  deleteUser(req, res) {},
  // BONUS: remove a user's associated thoughts when deleted

  //Post to add a new friend to a user's friend list
  addFriend(req, res) {},
  //delete to remove a friend from a user's friend list
  deleteFriend(req, res) {},
};
