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
        res.status(500).json({ error: "error" });
      });
  },

  getThoughtById(req, res) {
    Thought.findById({ _id: req.params.thoughtId })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No user found with this id" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "error" });
      });
  },

  createThought(req, res) {
    const { userId } = body;
    Thought.create(body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json({ error: "An error occurred" }));
  },

  updateThought(req, res) {
    const { id } = req.params;
    const { body } = req;
    User.findOneAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No user found with this id" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json({ error: "An error occurred" }));
  },

  deleteThought(req, res) {
    const { id } = req.params;
    User.findOneAndDelete({ _id: id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No user found with this id" });
        }
      })
      .then(() => {
        res.json({ message: "User and thoughts have been deleted" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
      });
  },

  addReaction(req, res) {
    const { thoughtId } = req.params;
    User.findOneAndUpdate(
      { _id: thoughtId },
      { $addToSet: { Reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No user found with this id" });
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
    User.findOneAndUpdate(
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