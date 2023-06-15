const { Thought, User } = require("../models");

const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "An error occurred" });
        });
    },
    
    getThoughtById({ params }, res) {
        Thought.findById({ _id: params.thoughtId })
          .populate({
            path: 'reactions',
            select: '-__v',
          })
        .select("-__v")
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "No thought with this id" });
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "An error occurred" });
        });
    },
    
    createThought(req, res) {
      const { userId } = req.body;
      Thought.create(req.body)
        .then((dbThoughtData) => {
          return User.findOneAndUpdate(
            { _id: userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
          );
        })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: "Thought created but no user with this id" });
          }
          res.json({ message: "Thought successfully created" });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "An error occurred" });
        });
    },
  
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
        new: true,
        runValidators: true,
      })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with this id" });
          }
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "An error occurred" });
        });
    },

    deleteThought(req, res) {
      const { id } = req.params;
      Thought.findOneAndDelete({ _id: id })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with this id" });
          }
          return User.findOneAndUpdate(
            { thoughts: id },
            { $pull: { thoughts: id } },
            { new: true }
          );
        })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: "Thought created but no user with this id" });
          }
          res.json({ message: "Thought successfully deleted" });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "An error occurred" });
        });
    },
  
    addReaction(req, res) {
      const { thoughtId } = req.params;
      const { body } = req;
      Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $addToSet: { reactions: body } },
        { new: true, runValidators: true }
      )
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with this id" });
          }
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "An error occurred" });
        });
    },
  
    removeReaction(req, res) {
      const { thoughtId, reactionId } = req.params;
      Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } },
        { new: true }
      )
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: "No thought found with this id" });
          }
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "An error occurred" });
        });
    },
  };
  
  module.exports = thoughtController;