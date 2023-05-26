const route = require("express").Router();

// gets all of our created functions from the controller 
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require("../../controllers/thoughtController"); // importing

// routes
route.route('/').get(getThoughts); // homepage
route.route('/:userId').post(createThought); // created thoughts
route.route('/:userId/:thoughtId').get(getThoughtById).put(addReaction).delete(deleteThought); // CRUD routes for thoughtController
route.route('/:thoughtId/reactions/:reactionId').delete(removeReaction); // delete for reactions

module.exports = route;