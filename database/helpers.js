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


const getAllBusinessesFromText = (queryArray) => {
  console.log(queryArray);
    return Business.findAll({
      where: {
        name: {
          [Op.like]: {
            [Op.any]: queryArray.map(query => `%${query}%`),
        },
      },
    },
  })
    .then((businessInfo) => {
      console.log('businessinfo: ', businessInfo);
      return businessInfo;
    })
    .catch((err)=>{
      console.log('error line 66 helpers.js database');
    })

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

//get business by user id

const getBusinessByUser = (userId) => {
    Business.findOne({
        where: {
            idUser: userId,
        }
    })
    .then((result) => {
        return result;
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
            firebaseId: id,
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

// get all the reviews of a certain business by that businesses id
const getReviewsByBusiness = (businessId) => {
    return Review.findAll({
        where: {
            idBusiness: businessId,
        }
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err)
    });
}

//get featured image
const getFeaturedImage = (imageId) => {
    return Image.findOne({
        where: {
            id: imageId,
        }
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err)
    });
}

//get all images for a business
const getAllImagesByBusiness = (businessId) => {
    return Image.findAll({
        where: {inBusiness: businessId}
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err)
    });
}

module.exports = {
    addBusiness,
    getBusinessById,
    getAllBusinesses,
    getBusinessByUser,
    addUser,
    getUserById,
    addReview,
    getReviewsByBusiness,
    getFeaturedImage,
    getAllImagesByBusiness,
    getAllBusinessesFromText,

}
