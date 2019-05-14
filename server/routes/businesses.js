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
  getReviewsByBusiness,
  updateBusinessRating,
} = require('../../database/helpers');
require('dotenv').config();

/**
 * These are the routes for business-related information.
 * All endpoints look like:
 * "/api/business/[rest of endpoint here]"
 */

/**
 * Grabs all businesses from the database.
 * @name Get All Businesses
 * @route {GET} /api/business/
 */
router.get('/', (req, res) => {
  console.log('Grabbing all businesses');
  getAllBusinesses()
    .then((results) => {
      res.send(results);
    });
});

/**
 * Grabs the business owned by a specific user (specified by user Id)
 * @name Get Business by User ID
 * @route {GET} /api/business/userid/:id
 * @routeparam {Number} :id is the unique id for a user.
 */
router.get('/userid/:id', (req, res) => {
  const userId = req.params.id;
  getBusinessByUser(userId)
    .then(results => res.send(results));
});

/**
 * Grabs the business owned by a specific user (specified by firebase UID)
 * @name Get Business by User Firebase ID
 * @route {GET} /api/business/firebaseId/:uid
 * @routeparam {String} :uid is the unique firebase id for a user.
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

/**
 * Searches the database for businesses that match a query.
 * @name Search For Business
 * @route {GET} /api/business/search/:query
 * @routeparam {String} :query is a string to query by.
 */
router.get('/search/:query', (req, res) => {
  const { query } = req.params;
  console.log(query);
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

/**
 * Updates a business's average rating.
 * @name Update Business Avg Review
 * @route {PUT} /api/business/avgreviews
 * @bodyparam {Number} id is the unique identifier for the business we are updating.
 */
router.put('/avgreviews', (req, res) => {
  const { id } = req.body;
  console.log('average review endpoint', id);
  let avgRating;
  getReviewsByBusiness(id)
    .then((reviews) => {
      if (reviews.length > 0) {
        avgRating = reviews.reduce((total, review) => total + review.ratingNumber, 0) / reviews.length;
        updateBusinessRating(id, Math.floor(avgRating))
          .then(() => res.sendStatus(201));
      } else {
        avgRating = 0;
        updateBusinessRating(id, avgRating)
          .then(() => res.sendStatus(201));
      }
    });
});


/**
 * Sets a business's owner to a specified user (specified by firebase)
 * @name Claim Business
 * @route {PUT} /api/business/claim/:id
 * @routeparam {Number} :id is the unique identifier for a business.
 * @bodyparam {String} uid is the unique firebase id for a user.
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
 * Updates the information of a specified business (specified by Id)
 * @name Update Business
 * @route /api/business/update/:id
 * @routeparam {Number} :id is the unique identifier for a business.
 * @bodyparam {Object} changes is an object containing the changes to be made to the business.
 */
router.put('/update/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const changes = req.body;
  updateBusiness(id, changes)
    .then(() => res.sendStatus(201))
    .catch(error => console.error(error));
});

/**
 * Verifies a business by checking if text in an image matches any business name in the database.
 * @name Verify A Business
 * @route {POST} /api/business/isVerfied
 * @bodyparam {String} img is the base64 encoded image to be checked for text.
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
