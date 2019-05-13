/* eslint-disable no-console */
const { Op } = require('sequelize');
const {
  User,
  Business,
  CommunityListing,
  Review,
  Image,
} = require('./index.js');

/**
 * Takes in an object representing a business and adds it to the database.
 * @param {object} businessObj - An object representing a business.
 * @return {promise}
 */
const addBusiness = businessObj => (
  Business.create(businessObj)
    .then(result => result)
    .catch(err => console.log(err))
);

/**
 * Grabs all business listings from the database.
 * @return {promise}
 */
const getAllBusinesses = () => (
  Business.findAll()
    .then(results => results)
    .catch(err => console.log(err))
);

/**
 * Finds any businesses that match any of the words present in the queryArray.
 * @param {string[]} queryArray - An array of strings to query businesses by.
 * @return {promise}
 */
const getAllBusinessesFromText = queryArray => (
  Business.findAll({
    where: {
      name: {
        [Op.like]: {
          [Op.any]: queryArray,
        },
      },
    },
  })
    .then(businessInfo => businessInfo)
    .catch(err => console.log(err))
);

/**
 * Sets the owner of a business using the id for the owner and the id for the business.
 * @param {number} userId - The id of the user to set as the business's owner.
 * @param {number} businessId - The id of the business to set the owner of.
 * @return {promise}
 */
const setBusinessOwner = (userId, businessId) => (
  Business.update({ idUser: userId }, { where: { id: businessId } })
);

/**
 * Updates a business (specified by businessId) using an object of changes.
 * @param {number} businessId - The id of the business to be update.
 * @param {object} changes - An object with key/value pairs of field-to-update/updated-value.
 * @return {promise}
 */
const updateBusiness = (businessId, changes) => (
  Business.update(changes, { where: { id: businessId } })
);

/**
 * Updates a user (specified by firebase uid) using an object of changes.
 * @param {string} uid - A string representing the firebase uid of a user.
 * @param {object} changes - An object with key/value pairs of field-to-update/updated-value.
 * @return {promise}
 */
const updateUser = (uid, changes) => (
  User.update(changes, { where: { uid } })
);

/**
 * Grabs a business specified by id.
 * @param {number} id - A number representing the business's id.
 * @return {promise}
 */
const getBusinessById = id => (
  Business.findOne({ where: { id } })
    .then(business => business)
    .catch(err => console.log(err))
);

/**
 * Grabs a business specified by the owner's user id.
 * @param {number} userId - A number representing a user id.
 * @return {promise}
 */
const getBusinessByUser = userId => (
  Business.findOne({ where: { idUser: userId } })
    .then(result => result)
    .catch(err => console.log(err))
);

/**
 * Adds a user to the database using information from a userObj.
 * @param {object} userObj - An object containing the new user's information.
 * @return {promise}
 */
const addUser = userObj => (
  User.create(userObj)
    .then(result => result)
    .catch(err => console.log(err))
);

/**
 * Grabs a user from the database specified by the user's firebase Id.
 * @param {string} uid - A string representing a user's firebase Id.
 * @return {promise}
 */
const getUserById = uid => (
  User.findOne({ where: { firebaseId: uid } })
    .then(user => user)
    .catch(err => console.log(err))
);

/**
 * Grabs a user from the database specified by the user's database id.
 * @param {number} id - A number representing a user's database id.
 * @return {promise}
 */
const getUserByUserId = id => (
  User.findOne({ where: { id } })
    .then(user => user)
    .catch(err => console.log(err))
);

/**
 * Grabs all users from the database.
 * @return {promise}
 */
const getAllUsers = () => (
  User.findAll()
    .then(results => results)
    .catch(err => console.log(err))
);

/**
 * Grabs a business from the database specified by the owner's firebase Id.
 * @param {string} uid - A string representing a user's firebase Id.
 * @return {promise}
 */
const getBusinessByFirebaseId = uid => (
  getUserById(uid)
    .then(result => getBusinessByUser(result.id))
);

/**
 * Adds a review to the database.
 * @param {object} reviewObj - An object containing the information for a review.
 * @return {promise}
 */
const addReview = reviewObj => (
  Review.create(reviewObj)
    .then(result => result)
    .catch(err => console.log(err))
);

/**
 * Grabs all the reviews for a specified business Id.
 * @param {number} businessId - A number representing a business's Id.
 * @return {promise}
 */
const getReviewsByBusiness = businessId => (
  Review.findAll({ where: { idBusiness: businessId } })
    .then(result => result)
    .catch(err => console.log(err))
);

/**
 * Grabs all reviews made by a specific user, specified by user's Id.
 * @param {number} userId - A number representing the user's Id.
 * @return {promise}
 */
const getReviewsByUser = userId => (
  Review.findAll({ where: { idUser: userId } })
    .then(result => result)
    .catch(err => console.log(err))
);

/**
 * Grabs a single image specified by image's Id.
 * @param {number} imageId - A number representing an image's Id.
 * @return {promise}
 */
const getFeaturedImage = imageId => (
  Image.findOne({ where: { id: imageId } })
    .then(result => result)
    .catch(err => console.log(err))
);

/**
 * Grabs all images associated with a specified business Id.
 * @param {number} businessId - A number representing a business's Id.
 */
const getAllImagesByBusiness = businessId => (
  Image.findAll({ where: { inBusiness: businessId } })
    .then(result => result)
    .catch(err => console.log(err))
);

/**
 * Adds a community listing to a database.
 * @param {object} communityListingInfo - An object representing a community listing.
 * @param {string} defaultImageUrl - A string representing an image URL for the listing.
 */
const addCommunityListing = (communityListingInfo, defaultImageUrl) => {
  const communityListing = Object.create(communityListingInfo);
  communityListing.imageUrl = defaultImageUrl;
  return CommunityListing.create(communityListing);
};

/**
 * Deletes a community listing in the database.
 * @param {number} idUser - A number representing the review's author's user Id.
 * @param {number} id - A number representing the review's Id.
 * @return {promise}
 */
const removeCommunityListing = (idUser, id) => (
  CommunityListing.destroy({ where: { idUser, id } })
    .then(result => console.log(result, 'was removed from database'))
    .catch(err => console.log('error line 176 helpers.js database: ', err))
);

/**
 * Grabs all community listings in the database.
 * @return {promise}
 */
const getAllCommunityListings = () => (
  CommunityListing.findAll()
    .then(result => result)
    .catch(err => console.log('error line 183 db helers:', err))
);

/**
 * Finds any listings in the database which match any word in the query array.
 * @param {string[]} communityListingsQuery - An array of strings to query the listings by.
 */
const searchForCommunityListings = communityListingsQuery => (
  CommunityListing.findAll({
    where: {
      title: {
        [Op.like]: {
          [Op.any]: communityListingsQuery,
        },
      },
    },
  })
    .then(result => result)
    .catch(err => console.log('error line 198 db helpers:', err))
);


module.exports = {
  addBusiness,
  getBusinessById,
  getAllBusinesses,
  getBusinessByUser,
  addUser,
  getAllUsers,
  getUserById,
  getUserByUserId,
  addReview,
  getReviewsByBusiness,
  getReviewsByUser,
  getFeaturedImage,
  getAllImagesByBusiness,
  getAllBusinessesFromText,
  addCommunityListing,
  removeCommunityListing,
  getAllCommunityListings,
  searchForCommunityListings,
  getBusinessByFirebaseId,
  setBusinessOwner,
  updateUser,
  updateBusiness,
};
