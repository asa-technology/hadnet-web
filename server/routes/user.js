/* eslint-disable no-console */
const router = require('express').Router();
const {
  addUser,
  getUserById,
  getUserByUserId,
  updateUser,
  getAllUsers,
} = require('../../database/helpers');

/**
 * 
 */

/**
 * Grabs all users from the database.
 * @name Get All Users
 * @route {GET} /api/user/
 */
router.get('/', (req, res) => {
  getAllUsers()
    .then(users => res.send(users))
    .catch((err) => {
      console.error(err);
    });
  console.log('Grabbing all users');
});

/**
 * Grabs specific user from database, specified by firebase UID.
 * @name Get User By Firebase UID
 * @route {GET} /api/user/firebaseId/:uid
 * @routeparam {String} uid is the unique firebase ID for a user.
 */
router.get('/firebaseId/:uid', (req, res) => {
  const { uid } = req.params;
  getUserById(uid)
    .then(result => res.send(result));
});

/**
 * Grabs a specific user from database, specified by ID.
 * @name Get User By ID
 * @route {GET} /api/user/:id
 * @routeparam {Number} id is the unique ID for a user.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  getUserByUserId(id)
    .then(user => res.send(user))
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});


/**
 * Adds a user to the database.
 * @name Add User
 * @route {POST} /api/user/
 * @bodyparam {Object} user is an object representing a user's info.
 */
router.post('/', (req, res) => {
  const user = req.body;
  console.log(`Adding user: ${user.displayName} to db`);
  addUser(user)
    .then(result => res.status(201).send(result));
});


// update user at specified firebase uid
/**
 * Updates a user, specified by firebase UID.
 * @name Update User
 * @route {PUT} /api/user/:uid
 * @routeparam {String} uid is the unique firebase UID for a user.
 * @bodyparam {Object} changes is an object containing the changes to be made to a user.
 */
router.put('/:uid', (req, res) => {
  const { uid } = req.params;
  const changes = req.body;
  updateUser(uid, changes)
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.error(error);
    });
});


module.exports = router;
