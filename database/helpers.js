const { Op } = require('sequelize');
const  {
    User,
    BusinessType,
    ListingType,
    Business,
    CommunityListing,
    Review,
    Image,
 } = require ('./index.js');

 // Add business to database
const addBusiness = (businessObj) => {
    return Business.create(businessObj)
    .then((result) => {
        console.log('entered business into db');
        return result})
    .catch((err) => {
        console.log(err)
    });
};


// Get all businesses
const getAllBusinesses = () => {
    return Business.findAll()
    .then((results) => {
        return results;
    })
    .catch((err) => {
        console.log(err)
    });
}

// Get business by id
const getBusinessById = (id) => {
    return Business.findOne({
        where: {
            id: id,
        }
    })
    .then((business) => {
        return business;
    })
    .catch((err) => {
        console.log(err)
    });
}

 // Add user to database
 const addUser = (userObj) => {
    return User.create(userObj)
    .then((result) => {
        console.log('entered user into db');
        return result})
    .catch((err) => {
        console.log(err)
    });
};

// Get user by firebase id
const getUserById = (id) => {
    return User.findOne({
        where: {
            firebase_id: id,
        }
    }).then((user) => {
        return user;
    })
    .catch((err) => {
        console.log(err)
    });
}

// add review
const addReview = (reviewObj) => {
    return Review.create(reviewObj)
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err)
    });  
}

const getReviewsByBusiness = (businessId) => {
    return Review.findAll({
        where: {
            id_business: businessId,
        }
    })
}

module.exports = {
    addBusiness,
    getBusinessById,
    getAllBusinesses,
    addUser,
    getUserById,
    addReview,
    getReviewsByBusiness,

}