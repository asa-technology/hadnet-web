const router = require('express').Router();
const { db } = require('../../database/index');

const { reviews } = require('../../database/mock-reviews');

router.get('/business/:id', (req, res) => {
  // if(req.params.id){
  //   const businessId = parseInt(req.params.id);
  // } commenting out for now to hardcode id of 1
  const businessId = 1;
    /****************TODO****************
   * get reviews for specific business
   */
  console.log(`Grabbing all reviews for business id: ${businessId}`)
  const businessReviews = reviews.filter((review) => {
    return (review.idBusiness === businessId);
  });
  console.log(businessReviews)
  res.send(businessReviews);
});

router.get('/user/:id', (req,res) => {
  const userId = parseInt(req.params.id);

    /****************TODO****************
   * get reviews for specific user
   */
  console.log(`Grabbing all reviews for user id: ${userId}`);
  const userReviews = reviews.filter((review) => {
    return (review.idUser === userId);
  })
  res.send(userReviews);
})

router.post('/', (req, res) => {
  const review = req.body;

  /****************TODO****************
   * add review to specified business
   */

});



module.exports = router;
