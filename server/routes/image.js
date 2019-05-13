/* eslint-disable no-console */
const router = require('express').Router();
const { getFeaturedImage } = require('../../database/helpers');


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

router.get('/business/:id', (req, res) => {
  // add functionality to get images by busimess id
  const businessId = parseInt(req.params.id, 10);
});

module.exports = router;
