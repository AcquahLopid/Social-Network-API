const route = require("express").Router();

// gets all of our created functions from the controller 
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require("../../controllers/userController"); // importing

// routes
route.route('/').get(getUsers).post(createUser); // homepage of users and created users
route.route('/:id').get(getUserById).put(updateUser).delete(deleteUser); // CRUD routes for UserController
route.route('/friends/:userId/:friendId').post(addFriend).delete(removeFriend); // delete for friends and add friends

module.exports = route;