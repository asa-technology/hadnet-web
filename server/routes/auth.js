const router = require('express').Router();
const bodyParser = require('body-parser');

router.post('/login', bodyParser.json(), (req, res) => {
  console.log('User logged in!');
});

router.get('/test', (req, res) => {
  res.sendStatus(200);
});


module.exports = router;
