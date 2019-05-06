const router = require('express').Router();
const { db } = require('../../database/index');

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
  const id = req.params.id - 1;
  //for presentation: autoserv user comment hardcoded for username
  /****************TODO****************
   * get user by id from database
   */
  if(users[id]){
    console.log(`Grabbing user at id: ${id + 1}`);
    res.send([users[id]]); // we need to send back an array of users if it's for reviews
  } else {
    res.sendStatus(404);
  }
});


// add user
router.post('/', (req, res) => {
  const user = req.body;
  console.log(`added user: ${user.display_name} to db`);

  /****************TODO****************
   * add business to database
   */
  res.send(`added user: ${user.display_name} to db`)
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
