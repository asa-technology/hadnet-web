/* eslint-disable no-console */
const router = require('express').Router();
const {
  addReview,
  getUserById,
  getReviewsByBusiness,
  getReviewsByUser,
} = require('../../database/helpers');

/**
 * Grabs all reviews associated with a specified business.
 * @name Get Reviews By Business ID
 * @route {GET} /api/review/business/:id
 * @routeparam {Number} id is the unique identifier for a business.
 */
router.get('/business/:id', (req, res) => {
  const { id } = req.params;
  getReviewsByBusiness(id)
    .then((reviews) => {
      res.send(reviews);
    }).catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

/**
 * Grabs all reviews associated with a specified user (specified by ID).
 * @name Get Reviews By User ID
 * @route {GET} /api/review/user/:id
 * @routeparam {Number} id is the unique identifier for a user.
 */
router.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  getReviewsByUser(userId)
    .then((reviews) => {
      res.send(reviews);
    }).catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

/**
 * Adds a review to the database.
 * @name Add Review
 * @route /api/review/
 * @bodyparam {Object} review is an object containing the info for a review.
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
});

module.exports = router;
