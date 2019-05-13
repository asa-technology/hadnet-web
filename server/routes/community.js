/* eslint-disable no-console */
const router = require('express').Router();
const {
  addCommunityListing, removeCommunityListing, getAllCommunityListings, searchForCommunityListings,
} = require('../../database/helpers');

/**
 ********* requests to these endpoints must be preceded by: '/api/community' ********
 */

/**
 * this does nothing
 */
router.get('/', (req, res) => {
  console.log('Getting community data!');
});

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
 *  adds community listing to the communityListings table
 */
router.post('/addCommunityListing', (req, res) => {
  console.log(req.body);
  // req body requires a userid, title, body, image url, expiration date
  const defaultImageUrl = 'https://makitweb.com/demo/broken_image/images/noimage.png';
  return addCommunityListing(req.body, req.body.imageUrl || defaultImageUrl)
  // sends back info regarding listing that was posted
    .then(communityListingAdded => res.send(communityListingAdded))
    .catch(err => console.log('server/community, error line 29: ', err) /**  res.send('my condolences, friend. that didnt quite work') */);
});

/**
 *  delete requests to '/removeCommunityListing'remove specific community listing,
 *  takes in a user's id and a listing's title
 */
router.delete('/removeCommunityListing', (req, res) => {
  console.log(req.query);
  removeCommunityListing(req.query.idUser, req.query.id)
    .then(removedCommunityListing => res.send(removedCommunityListing))
    .catch(err => console.log('server/community, error line 36: ', err));
});

/**
 *  get requests to '/getAllCommunityListings' return all community listings in table
 */
router.get('/getAllCommunityListings', (req, res) => (
  getAllCommunityListings()
    .then(allCommunityListings => res.send(allCommunityListings))
    .catch(err => console.log('server/community, error line 43: ', err))));

/**
 * get requests to '/searchForCommunityListings' take in a community listing title,
 * and return array of all listings including the query in their title.
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
