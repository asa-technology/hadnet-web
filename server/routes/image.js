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
      console.log(result);
      res.send(result);
    }).catch((err) => {
      console.log(err);
    });
})

router.get('/business/:id', (req, res) => {
  // gotta re-dynamic this endpoint, changed the first if statement
  // to automatically send back display businesses image
  const businessId = parseInt(req.params.id, 10);
});

module.exports = router;
