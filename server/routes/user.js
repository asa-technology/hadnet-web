/* eslint-disable no-console */
const router = require('express').Router();
const {
  addUser, getUserById, getUserByUserId, updateUser, getAllUsers,
} = require('../../database/helpers');

/**
 ********* requests to these endpoints must be preceded by: '/api/user' ********
 */

/**
 *  get requests to '/' return all users in database
 */
router.get('/', (req, res) => {
  getAllUsers()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
    });
  console.log('Grabbing all users');
});

/**
 * get requests to '/firebaseId' take in a user I.D. and return information stored
 * in users table in the database, associated with this user I.D.
 */
router.get('/firebaseId/:id', (req, res) => {
  const { id } = req.params;
  getUserById(id)
    .then(result => res.send(result));
});

/**
 *  get requests to '/' return user information stored with associated user's I.D.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  getUserByUserId(id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});


/**
 * post requests to '/' add users to users table in the database, users info is
 * given in post request's body
 */
router.post('/', (req, res) => {
  const user = req.body;
  console.log(`Adding user: ${user.displayName} to db`);
  addUser(user)
    .then(result => res.status(201).send(result));
});


/**
 * put requests to '/' update user's information at associated, specified firebase uid
 */
router.put('/:uid', (req, res) => {
  const { uid } = req.params;
  const changes = req.body;
  updateUser(uid, changes)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
    });
});


module.exports = router;
