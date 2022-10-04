//Thought model
const Thought = require("../models/Thought");
//User model
const User = require("../models/User");

module.exports = {
  //All thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //Single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate("reactions")
      .then((thought) => {
        if (!thought) {
          res.status(404).json({
            message: "No thought found with that Id",
          });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  //Create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought(req, res) {
    Thought.create(req.body)
      .then((userData) => {
        //Adding new thought to user thoughts array
        User.findByIdAndUpdate(
          { username: req.body.userName },
          {
            //Push new thought to array
            $push: { thoughts: userData._id },
          },
          { new: true }
        );
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },
  //Update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedThought) => {
        if (!updatedThought) {
          res.status(404).json({
            message: "No thought found with that Id",
          });
        } else {
          res.json(updatedThought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  //Delete to remove thought by its _id
  deleteThought(req, res) {
    Thought.findByIdAndRemove({ _id: req.params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          res.status(404).json({
            message: "No thought found with that Id",
          });
        } else {
          res.json("Thought was deleted");
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  //Create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      {
        //adding new reaction to array
        $addToSet: {
          reactions: req.body,
        },
      },
      { runValidators: true, new: true }
    )
      .then((newReaction) => {
        if (!newReaction) {
          res.status(404).json({
            message: "No thought found with that Id",
          });
        } else {
          res.json(newReaction);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  //Delete to pull and remove a reaction by the reaction's reactionId value
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      //pulling to remove the reaction from the thought
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((removedReaction) => {
        if (!removedReaction) {
          res.status(404).json({
            message: "No thought found with that Id",
          });
        } else {
          res.json("Reaction was removed from thought");
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};
