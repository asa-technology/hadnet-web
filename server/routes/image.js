/* eslint-disable no-console */
const router = require('express').Router();
const { getFeaturedImage } = require('../../database/helpers');

/**
 ********* requests to these endpoints must be preceded by: '/api/image' ********
 */

/**
  * takes in a user(type: business) I.D. and returns the featured
  * image associated with user's I.D.
  */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  getFeaturedImage(id)
    .then((result) => {
      if (result === undefined) {
        res.send(null);
      } else {
        res.send(result);
      }
      res.send(result);
    }).catch((err) => {
      console.log(err);
    });
})

/**
 * this does nothing
 */
router.get('/business/:id', (req, res) => {
  // add functionality to get images by busimess id
  const businessId = parseInt(req.params.id, 10);
});

module.exports = router;
