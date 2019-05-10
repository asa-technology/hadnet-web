const router = require('express').Router();
const { db } = require('../../database/index');
const { addCommunityListing, removeCommunityListing, getAllCommunityListings, searchForCommunityListings } = require('../../database/helpers');
// mock data
const { communityListings } = require('../../database/mock-community-listings');

router.get('/', (req, res) => {
  console.log('Getting community data!');
  res.send(communityListings);
});

// adds community listing
router.post('/addCommunityListing', (req, res) => {
  // req body requires a userid, title, body, image url, expiration date
  const defaultImageUrl = 'https://makitweb.com/demo/broken_image/images/noimage.png';
  const communityListing = {
    userId: req.body.userId,
    title: req.body.title,
    body: req.body.listingBody,
    imageUrl: req.body.imageUrl || defaultImageUrl,
    expirationDate: req.body.expirationDate,
  };
  return addCommunityListing(communityListing)
    .then(communityListingAdded => res.send(communityListingAdded)) // sends back info regarding listing that was posted
    .catch(err => console.log('server/community, error line 17: ', err), res.send('my condolences, friend. that didnt quite work'));
});
// removes specific community listing, takes in a user's id and a listing's title
router.delete('/removeCommunityListing', (req, res) => {
  removeCommunityListing(req.idUser, req.title)
    .then(removedCommunityListing => res.send(removedCommunityListing))
    .catch(err => console.log('server/community, error line 23: ', err), res.send('nope'));
});

// returns all community listings
router.get('/getAllCommunityListings', (req, res) => {
  return getAllCommunityListings()
    .then(allCommunityListings => res.send(allCommunityListings))
    .catch(err => console.log('server/community, error line 30: ', err), res.send('nope'));
});

// takes in a community listing title,
// returns array of all listings including the query in their title
router.get('/searchForCommunityListings', (req, res) => {
  return searchForCommunityListings(req.communityListingQuery)
    .then(communityListingSearchResults => res.send(communityListingSearchResults))
    .catch(err => console.log('server/community, error line 36: ', err), res.send('nope'));
});

module.exports = router;
