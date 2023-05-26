const { User } = require("../models");

const userController = {
  getUsers(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
      });
  },

  getUserById(req, res) {
    const { id } = req.params;
    User.findOne({ _id: id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
      });
  },

  createUser(req, res) {
    const { body } = req;
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json({ error: "An error occurred" }));
  },

  updateUser(req, res) {
    const { id } = req.params;
    const { body } = req;
    User.findOneAndUpdate({ _id: id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(500).json({ error: "An error occurred" }));
  },

  deleteUser(req, res) {
    const { id } = req.params;
    User.findOneAndDelete({ _id: id })
      .then((dbUserData) => {
        if (!dbUserData) {
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

  addFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { friends: friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
      });
  },

  removeFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
      });
  },
};

module.exports = userController;