/* eslint-disable no-console */
require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const {
  getAllBusinessesFromText,
  getAllBusinesses,
  getBusinessByUser,
  setBusinessOwner,
  getUserById,
  getBusinessByFirebaseId,
  updateBusiness,
} = require('../../database/helpers');
require('dotenv').config();


/**
 ********* requests to these endpoints must be preceded by: '/api/business' ********
 */

/**
  * getAllBusinesses is called when a get request to '/' is made,
  * returning an array of all the businesses in the businesses table.
*/
router.get('/', (req, res) => {
  console.log('Grabbing all businesses');
  getAllBusinesses()
    .then((results) => {
      res.send(results);
    });
});

/**
 * getBusinessByUser takes in a userId, which is the I.D. number of the current user
 * this route is used to retrieve businesses that are associated with the current user's ID
 */
router.get('/userid/:id', (req, res) => {
  const userId = req.params.id;
  getBusinessByUser(userId)
    .then(results => res.send(results));
});

/**
 * getBusinessByFirebaseId retrieves businesses associated with given uid {firebase ID}
 */
router.get('/firebaseId/:uid', (req, res) => {
  const { uid } = req.params;
  console.log(`Grabbing businesses associated with UID: ${uid}`);
  getBusinessByFirebaseId(uid)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});


// gets business at specified id
// this still uses mock data
/**
 * no it doesn't
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  /** **************TODO****************
   * get business by id from database
   */
});

/**
 * get requests to '/search/' parse the query attached to the req's params,
 * search for the business using the @function getAllBusinessesFromText database helper function
 */
router.get('/search/:query', (req, res) => {
  const { query } = req.params;
  let origArray;
  let uppArray;
  let lowArray;
  let capArray;
  let decapArray;
  let queryArray;
  if (query.includes(' ')) {
    origArray = query.split(' ').map(queryWord => `%${queryWord}%`);
    origArray.push(`%${query}%`);

    uppArray = query.split(' ').map(uppWord => `%${uppWord.toUpperCase()}%`);
    uppArray.push(`%${query.toUpperCase()}%`);

    capArray = query.split(' ').map(capWord => `%${capWord.charAt(0).toUpperCase()}${capWord.slice(1)}%`);
    capArray.push(`%${query.charAt(0).toUpperCase()}${query.slice(1)}%`);

    decapArray = query.split(' ').map(decapWord => `%${decapWord.charAt(0)}${decapWord.slice(1).toLowerCase()}%`);
    decapArray.push(`%${query.charAt(0)}${query.slice(1).toLowerCase()}%`);

    lowArray = query.split(' ').map(lowWord => `%${lowWord.toLowerCase()}%`);
    lowArray.push(`%${query.toLowerCase()}%`);
    queryArray = origArray.concat(uppArray).concat(lowArray).concat(capArray).concat(decapArray);
  } else {
    queryArray = [`%${query}%`];
    queryArray.push(`%${query.toLowerCase()}%`);
    queryArray.push(`%${query.toUpperCase()}%`);
    queryArray.push(`%${query.charAt(0).toUpperCase()}${query.slice(1)}%`);
    queryArray.push(`%${query.charAt(0)}${query.slice(1).toLowerCase()}%`);
  }
  getAllBusinessesFromText(queryArray)
    .then((businessesArray) => {
      res.send(businessesArray);
      console.log(businessesArray);
    })
    .catch((error) => {
      res.send('no matches founc');
      console.error(error);
    });
});

// adds business
/**
 * no it doesn't
 */
router.post('/', (req, res) => {
  // const business = req.body;
  // console.log(`added business: ${business.name} to db`);

  // /** **************TODO****************
  //  * add business to database
  //  */
  // res.send(`added business: ${business.name} to db`);
});


/**
 * put requests to '/claim' take in a user I.D. as part of the request's params,
 * a firebase I.D. in the request's body,
 * and a businesses owner is set.
*/
router.put('/claim/:id', (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id, 10);
  const { uid } = req.body;
  getUserById(uid)
    .then(result => setBusinessOwner(result.id, idNum))
    .then(() => res.sendStatus(201));
});

/**
 * updateBusiness is called, using the request's body object as the arguments
 */
router.put('/update/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const changes = req.body;
  updateBusiness(id, changes)
    .then(() => res.sendStatus(201))
    .catch(error => console.error(error));
});

/**
 * post requests to '/isVerified' verifies a business by checking if image data name
 * matches any buisness name in the business table
 *
 * if post request yields no results, 'Business Not Found, Please Try Again' is sent to the client,
 * determining that the camera has to be reloaded, and the user is given the option of taking
 * another picture of a business
 */
router.post('/isVerfied', (req, res) => {
  axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_IMAGE_VERIFY_KEY}`, {
    requests: [
      {
        image: {
          content: req.body.img,
        },
        features: [
          {
            type: 'DOCUMENT_TEXT_DETECTION',
            maxResults: 5,
          },
        ],
      },
    ],
  }).then((result) => {
    if (result.data.responses[0].textAnnotations) {
      let x = result.data.responses[0].textAnnotations[0].description.replace(/\n/g, ' ').split(' ');
      if (Array.isArray(x)) {
        x = x.map(query => `%${query}%`);
      } else if (x) {
        x = `%${x}%`;
      }
      x.pop();
      return getAllBusinessesFromText(x);
    }
    return 'Business Not Found, Please Try Again';
  })
    .then(business => res.json(business))
    .catch((error) => {
      console.log('error, line 148 businesses.js database: ', error);
    });
});


module.exports = router;
