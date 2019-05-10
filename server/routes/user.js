const router = require('express').Router();
const { db } = require('../../database/index');
const { 
  addUser,
  getUserById,
  getUserByUserId,
} = require('../../database/helpers');

// mock data
const { users } = require('../../database/mock-user-data');


// gets all users
router.get('/', (req, res) => {
  console.log('Grabbing all users');

  /****************TODO****************
  * get all users from database
  */
  res.send(users);
});


// gets user at specified id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getUserByUserId(id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.sendStatus(404);
    })
});


// add user
router.post('/', (req, res) => {
  const user = req.body;
  console.log(`Adding user: ${user.displayName} to db`);
  addUser(user)
    .then(result => {
      res.sendStatus(201);
    })
})


// update user at specified id
router.patch('/:id', (req, res) => {
  const id = req.params.id - 1;

  /****************TODO****************
   * update business at id in database
   */
  res.send('updated user')
})



module.exports = router;
