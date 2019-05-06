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
        console.log('entered into db');
        return result})
    .catch(err => err);
};

const getAllBusinesses = () => {
    return Business.findAll()
    .then((results) => {
        return results;
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
}

module.exports = {
    addBusiness,
    getBusinessById,
    getAllBusinesses,
}