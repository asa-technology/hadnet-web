const router = require('express').Router();
const { db } = require('../../database/index');
const { getAllBusinesses } = require('../../database/helpers');
require('dotenv').config();
// mock data
const { businesses } = require('../../database/mock-business-data');
const axios = require('axios');


// gets all businesses
router.get('/', (req, res) => {
  console.log('Grabbing all businesses');
  getAllBusinesses()
  .then((results) => {
    res.send(results);
  })
  /****************TODO****************
   * get all businesses from database
  */
  //res.send(businesses);
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

//verifies a business by checking if image data name matches any buisness name in the table
router.post('/isVerfied', (req, res) => {
  axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_IMAGE_VERIFY_KEY}`, {
    "requests":[
      {
        "image":{
          "content": req.body.img
        },
        "features":[
          {
            "type":'TEXT_DETECTION',
            "maxResults":5
          }
        ]
      }
    ]
  }).then(result =>{
    // need to regex out all potential special characters this google api might generate,
    // and find a better way to plot this function out so that it doesn't take
    // a long time to execute

    // array of pieces of text that have been captured in picture
    let readText = result.data.responses[0].textAnnotations[0].description.split(' ');
    console.log(readText);
    // current verification status
    return getAllBusinesses().then((businesses)=>{
      let verificationStatus = false;
      businesses.map((business)=>{
        return business.legalBusinessName.toUpperCase().split(' ');
      })
      .filter((businessesToBeComparedToReadText)=>{
          return businessesToBeComparedToReadText.includes(...readText);

      }).length > 0 ? verificationStatus = true : null;
      let obj = { verificationStatus: verificationStatus, text: readText };
      return obj;
    })
  })
  .then(verificationStatus => {
    console.log(verificationStatus)
    res.send(verificationStatus);
  })
  .catch(error=>{
    res.send('failure to verify, or text was misinterpreted, line 102 businesses.js server')
  })
});


module.exports = router;

