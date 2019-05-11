const router = require('express').Router();
const { db } = require('../../database/index');
const { getFeaturedImage } = require('../../database/helpers');

//mock data
const { images } = require('../../database/mock-image-data');

router.get('/:id', (req, res) =>{
  const id = req.params.id;
  getFeaturedImage(id)
    .then((result) => {
      if (result === undefined) {
        res.send(null);
      } else {
        res.send(result)
      }
      console.log(result)
      res.send(result);
    }).catch((err) => {
      console.log(err);
    });
})

router.get('/business/:id', (req, res) => {
  //gotta re-dynamic this endpoint, changed the first if statement to automatically send back display businesses image
  const businessId = parseInt(req.params.id)
  const businessImages = images.filter((image) => {
    return  (image.idBusiness === businessId)
  })
  if (businessImages) {
    res.send(businessImages);
  } else {
    res.send({
      id: null,
      url: 'https://i.imgur.com/BNtJWJM.png',
      idBusiness: null,
    });
  }
})

module.exports = router;
