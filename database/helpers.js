const { Op } = require('sequelize');
<<<<<<< HEAD
const  {
=======
const {
>>>>>>> da0b3b80411f2c59f4de97de02eeb1da6beda2b5
  User,
  BusinessType,
  ListingType,
  Business,
  CommunityListing,
  Review,
  Image,
<<<<<<< HEAD
} = require ('./index.js');
 
// Add business to database
const addBusiness = (businessObj) => {
  return Business.create(businessObj)
    .then((result) => {
      console.log('entered business into db');
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};


// Get all businesses
const getAllBusinesses = () => {
  return Business.findAll()
    .then((results) => {
      return results;
    })
    .catch((err) => {
      console.log(err);
    });
}

const getAllBusinessesFromText = (queryArray) => {
  console.log('db helpers array', queryArray);
=======
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
>>>>>>> da0b3b80411f2c59f4de97de02eeb1da6beda2b5
  return Business.findAll({
    where: {
      name: {
        [Op.like]: {
          [Op.any]: queryArray,
<<<<<<< HEAD
        }
=======
        },
>>>>>>> da0b3b80411f2c59f4de97de02eeb1da6beda2b5
      },
    },
  })
    .then(businessInfo => businessInfo)
    .catch((err) => {
      console.log(err);
    });
};


// Get business by id
<<<<<<< HEAD
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
=======
const getBusinessById = id => Business.findOne({
  where: {
    id,
  },
})
  .then(business => business)
  .catch((err) => {
    console.log(err);
  });
>>>>>>> da0b3b80411f2c59f4de97de02eeb1da6beda2b5

// get business by user id

const getBusinessByUser = (userId) => {
  Business.findOne({
    where: {
      idUser: userId,
<<<<<<< HEAD
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
      return result;
    })
    .catch((err) => {
      console.log(err)
=======
    },
  })
    .then(result => result)
    .catch((err) => {
      console.log(err);
>>>>>>> da0b3b80411f2c59f4de97de02eeb1da6beda2b5
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
<<<<<<< HEAD
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

// get featured image
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

// get all images for a business
const getAllImagesByBusiness = (businessId) => {
  return Image.findAll({
    where: { inBusiness: businessId },
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
}
=======
const getUserById = id => User.findOne({
  where: {
    firebaseId: id,
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
>>>>>>> da0b3b80411f2c59f4de97de02eeb1da6beda2b5

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
<<<<<<< HEAD
}
=======
};
>>>>>>> da0b3b80411f2c59f4de97de02eeb1da6beda2b5
