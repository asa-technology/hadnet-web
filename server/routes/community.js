/* eslint-disable no-console */
const router = require('express').Router();
const {
  addCommunityListing,
  removeCommunityListing,
  getAllCommunityListings,
  searchForCommunityListings,
} = require('../../database/helpers');

// postman request structure, for testing :
// choosing not to use businessId, because businesses
// that even want to add listings need userId's anyway. - Sam
// {
//   "idUser": "2",
//   "title": "Come hang out at this fundraiser!",
//   "body": "We will have food and drinks, everything sold is to support a good cause!",
//     "imageUrl": "https://makitweb.com/demo/broken_image/images/noimage.png",
//     "date_expire": "2019-05-12"
// }

/**
 * Adds a community listing to the database.
 * @name Add Community Listing
 * @route {POST} /api/community/addCommunityListing (really needs to be renamed)
 * @bodyparam {Object} listing is an object containing the listing information.
 */
router.post('/addCommunityListing', (req, res) => {
  const listing = req.body;
  // req body requires a userid, title, body, image url, expiration date
  const defaultImageUrl = 'https://makitweb.com/demo/broken_image/images/noimage.png';
  return addCommunityListing(listing, listing.imageUrl || defaultImageUrl)
    .then(communityListingAdded => res.send(communityListingAdded))
    .catch(err => console.log('server/community, error line 29: ', err));
});

/**
 * Deletes a community listing.
 * @name Delete Community Listing
 * @route {DELETE} /api/community/removeCommunityListing (really needs to be renamed)
 * @queryparam {Number} idUser is a unique identifier for a user
 * @queryparam {Number} id is a unique identifier for the listing we're trying to delete.
 */
router.delete('/removeCommunityListing', (req, res) => {
  console.log(req.query);
  removeCommunityListing(req.query.idUser, req.query.id)
    .then(removedCommunityListing => res.send(removedCommunityListing))
    .catch(err => console.log('server/community, error line 36: ', err));
});

/**
 * Grabs all the community listings.
 * @name Get All Community Listings
 * @route {GET} /api/community/getAllCommunityListings (really needs to be renamed, should just be "/api/community/")
 */
router.get('/getAllCommunityListings', (req, res) => (
  getAllCommunityListings()
    .then(allCommunityListings => res.send(allCommunityListings))
    .catch(err => console.log('server/community, error line 43: ', err))));

// takes in a community listing title,
// returns array of all listings including the query in their title
/**
 * Grabs community listings that match a specified query.
 * @name Search For Community Listing
 * @route {GET} /api/community/searchForCommunityListings
 * @queryparam {String} title is the title of the listing to search for.
 */
router.get('/searchForCommunityListings', (req, res) => {
  const query = req.query.title;
  let origArray;
  let uppArray;
  let lowArray;
  let capArray;
  let decapArray;
  let queryArray;
  if (query.includes(' ')) {
    origArray = query.split(' ').map(queryWord => `%${queryWord}%`);
    origArray.push(`%${query}%`);

    uppArray = query.split(' ').map(uppWord => `%${uppWord.toUpperCase()}%`);
    uppArray.push(`%${query.toUpperCase()}%`);

    capArray = query.split(' ').map(capWord => `%${capWord.charAt(0).toUpperCase()}${capWord.slice(1)}%`);
    capArray.push(`%${query.charAt(0).toUpperCase()}${query.slice(1)}%`);

    decapArray = query.split(' ').map(decapWord => `%${decapWord.charAt(0)}${decapWord.slice(1).toLowerCase()}%`);
    decapArray.push(`%${query.charAt(0)}${query.slice(1).toLowerCase()}%`);

    lowArray = query.split(' ').map(lowWord => `%${lowWord.toLowerCase()}%`);
    lowArray.push(`%${query.toLowerCase()}%`);
    queryArray = origArray.concat(uppArray).concat(lowArray).concat(capArray).concat(decapArray);
  } else {
    queryArray = [`%${query}%`];
    queryArray.push(`%${query.toLowerCase()}%`);
    queryArray.push(`%${query.toUpperCase()}%`);
    queryArray.push(`%${query.charAt(0).toUpperCase()}${query.slice(1)}%`);
    queryArray.push(`%${query.charAt(0)}${query.slice(1).toLowerCase()}%`);
  }
  return searchForCommunityListings(queryArray) // [`%${req.query.title}%`] // must be an array
    .then(communityListingSearchResults => res.send(communityListingSearchResults))
    .catch(err => console.log('server/community, error line 52: ', err));
});


module.exports = router;
