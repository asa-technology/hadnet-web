const router = require('express').Router();
const { db } = require('../../database/index');
const { getAllBusinesses } = require('../../database/helpers');

// mock data
const { businesses } = require('../../database/mock-business-data');


// gets all businesses
router.get('/', (req, res) => {
  console.log('Grabbing all businesses');
  /*getAllBusinesses()
  .then((results) => {
    console.log(results)
    res.send(results);
  })
  /****************TODO****************
   * get all businesses from database
  */
  res.send(businesses);
});


// gets business at specified id
router.get('/:id', (req, res) => {
  const id = req.params.id - 1;

  /****************TODO****************
   * get business by id from database
   */
  if(businesses[id]){
    console.log(`Grabbing business at id: ${id}`)
    res.send(businesses[id]);
  } else {
    res.sendStatus(404);
  }
});


// adds business
router.post('/', (req, res) => {
  const business = req.body;
  console.log(`added business: ${business.name} to db`);

  /****************TODO****************
   * add business to database
   */
  res.send(`added business: ${business.name} to db`)
});


// update business at specific id
router.patch('/:id', (req, res) => {
  const id = req.params.id;

  /****************TODO****************
   * update business at id in database
   */
  res.send('updated business')
})



module.exports = router;