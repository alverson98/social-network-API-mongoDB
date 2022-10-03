//Thought model
const Thought = require("../models/Thought");

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
  //post to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought(req, res) {},
  //put to update a thought by its _id
  updateThought(req, res) {},
  //delete to remove thought by its _id
  deleteThought(req, res) {},

  //post to create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {},
  //delete to pull and remove a reaction by the reaction's reactionId value
  deleteReaction(req, res) {},
};
