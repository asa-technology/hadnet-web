const { Op } = require('sequelize');
const {
  User,
  BusinessType,
  ListingType,
  Business,
  CommunityListing,
  Review,
  Image,
} = require('./index.js');


// Add business to database
const addBusiness = businessObj => Business.create(businessObj)
  .then((result) => {
    console.log('entered business into db');
    return result;
  })
  .catch((err) => {
    console.log(err);
  });


// Get all businesses
const getAllBusinesses = () => Business.findAll()
  .then(results => results)
  .catch((err) => {
    console.log(err);
  });

const getAllBusinessesFromText = (queryArray) => {
  console.log(queryArray);
  return Business.findAll({
    where: {
      name: {
        [Op.like]: {
          [Op.any]: queryArray,
        },
      },
    },
  })
    .then(businessInfo => businessInfo)
    .catch((err) => {
      console.log(err);
    });
};


// Get business by id
const getBusinessById = id => Business.findOne({
  where: {
    id,
  },
})
  .then(business => business)
  .catch((err) => {
    console.log(err);
  });

// get business by user id

const getBusinessByUser = (userId) => {
  Business.findOne({
    where: {
      idUser: userId,
    },
  })
    .then(result => result)
    .catch((err) => {
      console.log(err);
    });
};

// Add user to database
const addUser = userObj => User.create(userObj)
  .then((result) => {
    console.log('entered user into db');
    return result;
  })
  .catch((err) => {
    console.log(err);
  });

// Get user by firebase id
const getUserById = id => User.findOne({
  where: {
    firebaseId: id,
  },
}).then(user => user)
  .catch((err) => {
    console.log(err);
  });

const getUserByUserId = id => User.findOne({
  where: {
    id: id,
  },
}).then(user => user)
  .catch((err) => {
    console.log(err);
  });

// add review
const addReview = reviewObj => Review.create(reviewObj)
  .then(result => result)
  .catch((err) => {
    console.log(err);
  });

// get all the reviews of a certain business by that businesses id
const getReviewsByBusiness = businessId => Review.findAll({
  where: {
    idBusiness: businessId,
  },
})
  .then(result => result)
  .catch((err) => {
    console.log(err);
  });

// get featured image
const getFeaturedImage = imageId => Image.findOne({
  where: {
    id: imageId,
  },
})
  .then(result => result)
  .catch((err) => {
    console.log(err);
  });

// get all images for a business
const getAllImagesByBusiness = businessId => Image.findAll({
  where: { inBusiness: businessId },
})
  .then(result => result)
  .catch((err) => {
    console.log(err);
  });

// adds community listing to communityListings table.
// takes in a title for listing,
// a body of text,
// an imageURL, (either a default if none selected, or user input url/uploaded image)
// date of listing expiration is going to be the day after the event is supposed to take place

const addCommunityListing = communityListingInfo => CommunityListing.create(communityListingInfo);

// takes in the id of a user who posted the listing, and the title of the listing
const removeCommunityListing = (idUser, title) => {
  CommunityListing.destroy({
    where: { idUser, title },
  })
    .then(result => console.log(result, 'was removed from database, function on line 154 helpers.js database'))
    .catch(err => console.log('error line 155 helpers.js database: ', err));
};

// returns all community listings
const getAllCommunityListings = () => {
  return CommunityListing.findAll()
    .then(result => result)
    .catch(err => console.log('error line 153 db helers:', err));
};

// queries community listings by title, maybe should also query based on body text??
const searchForCommunityListings = (communityListingsQuery) => {
  return CommunityListing.findAll({
    where: {
      title: {
        [Op.like]: {
          [Op.any]: communityListingsQuery,
        },
      },
    },
  })
    .then(result => result)
    .catch(err => console.log('error line 161 db helpers:', err));
};

// CommunityListing.init({
    //   title: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   body: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   imageUrl: Sequelize.STRING,
    //   date_expire: Sequelize.DATEONLY,
    // }, {
    //   sequelize,
    //   modelName: 'communitylisting',
    // });

module.exports = {
  addBusiness,
  getBusinessById,
  getAllBusinesses,
  getBusinessByUser,
  addUser,
  getUserById,
  getUserByUserId,
  addReview,
  getReviewsByBusiness,
  getFeaturedImage,
  getAllImagesByBusiness,
  getAllBusinessesFromText,
  addCommunityListing,
  removeCommunityListing,
  getAllCommunityListings,
  searchForCommunityListings,
};
