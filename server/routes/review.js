/* eslint-disable no-console */
const router = require('express').Router();
const {
  addReview,
  getUserById,
  getReviewsByBusiness,
  getReviewsByUser,
} = require('../../database/helpers');


router.get('/business/:id', (req, res) => {
  const { id } = req.params;
  getReviewsByBusiness(id)
    .then((reviews) => {
      res.send(reviews);
    }).catch((err) => {
      res.sendStatus(404);
    });
});

router.get('/user/:id', (req,res) => {
  const userId = parseInt(req.params.id, 10);
  getReviewsByUser(userId)
    .then((reviews) => {
      res.send(reviews);
    }).catch((err) => {
      res.sendStatus(404);
    });
});

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
