/* eslint-disable no-console */
const router = require('express').Router();
const {
  addReview,
  getUserById,
  getReviewsByBusiness,
  getReviewsByUser,
} = require('../../database/helpers');

/**
 ********* requests to these endpoints must be preceded by: '/api/review' ********
 */

/**
 * get requests to '/business/' require an id as part of params, and send back reviews
 * associated with this businesses I.D.
 */
router.get('/business/:id', (req, res) => {
  const { id } = req.params;
  getReviewsByBusiness(id)
    .then((reviews) => {
      res.send(reviews);
    }).catch((err) => {
      res.sendStatus(404);
    });
});

/**
 * get requests to '/user' require a user I.D. as part of params, and return all
 * reviews that are associated with user's I.D.
 */
router.get('/user/:id', (req,res) => {
  const userId = parseInt(req.params.id, 10);
  getReviewsByUser(userId)
    .then((reviews) => {
      res.send(reviews);
    }).catch((err) => {
      res.sendStatus(404);
    });
});

/**
 * post requests to '/' add a review to the reviews table in the database,
 * takes review object which must include a user I.D. Review is added,
 * review that has been added is sent as response.
 */
router.post('/', (req, res) => {
  const review = req.body;
  const { idUser } = review;
  getUserById(idUser)
    .then((user) => {
      const reviewObj = {
        text: review.text,
        ratingNumber: review.ratingNumber,
        idBusiness: review.idBusiness,
        idUser: user.id,
      };
      addReview(reviewObj)
        .then((result) => {
          console.log('review added to db');
          res.send(result);
        });
    });
  /** **************TODO****************
   * add review to specified business
   */
});
module.exports = router;
