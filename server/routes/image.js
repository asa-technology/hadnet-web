/* eslint-disable no-console */
const router = require('express').Router();
const { getFeaturedImage } = require('../../database/helpers');

/**
 * Grabs an image specified by its id.
 * @name Get Image by ID
 * @route {GET} /api/image/:id
 * @routeparam {Number} id is the unique identifier for an image.
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
});

module.exports = router;
