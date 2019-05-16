/* eslint-disable no-console */
require('dotenv').config();
const Sequelize = require('sequelize');

const {
  MASTER_USERNAME,
  MASTER_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_ENDPOINT,
} = process.env;

const sequelize = new Sequelize(
  DB_NAME,
  MASTER_USERNAME,
  MASTER_PASSWORD,
  {
    host: DB_ENDPOINT,
    dialect: 'postgres',
    port: DB_PORT,
    logging: false,
  },
);

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const { Model } = Sequelize;

//* ******///////TABLES///////*******//

// User table stores all data for Auth
class User extends Model {}
User.init({
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accountType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firebaseId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  urlImage: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'user',
});

// BusinessType holds our business types
class BusinessType extends Model {}
BusinessType.init({
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'businesstype',
});

// ListingType holds our listings for the communtiy listing board
class ListingType extends Model {}
ListingType.init({
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'listingtype',
});

class Business extends Model {}
Business.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: Sequelize.STRING,
  email: Sequelize.STRING,
  urlHomepage: Sequelize.STRING,
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT,
  averageRating: Sequelize.INTEGER,
  legalBusinessName: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'business',
});

// CommunityListing holds all of community listings
class CommunityListing extends Model {}
CommunityListing.init({
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: Sequelize.STRING,
  date_expire: Sequelize.DATEONLY,
}, {
  sequelize,
  modelName: 'communitylisting',
});

// Review will hold all review data
class Review extends Model {}
Review.init({
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ratingNumber: Sequelize.INTEGER,
}, {
  sequelize,
  modelName: 'review',
});

// Image will hold all image urls
class Image extends Model {}
Image.init({
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'image',
});

// Business foreign keys
BusinessType.hasOne(Business, { foreignKey: 'idBusinessType' });
Image.hasOne(Business, {
  foreignKey: 'idFeaturedImage',
  constraints: false,
});
User.hasOne(Business, { foreignKey: 'idUser' });

// CommunityListing foreign keys
User.hasOne(CommunityListing, { foreignKey: 'idUser' });
Business.hasOne(CommunityListing, { foreignKey: 'idBusiness' });
ListingType.hasOne(CommunityListing, { foreignKey: 'idListingType' });

// Review foreign keys
User.hasOne(Review, { foreignKey: 'idUser' });
Business.hasOne(Review, { foreignKey: 'idBusiness' });

// Image foreign keys
Business.hasOne(Image, { foreignKey: 'idBusiness' });

sequelize.sync();

module.exports = {
  db: sequelize,
  User,
  BusinessType,
  ListingType,
  Business,
  CommunityListing,
  Review,
  Image,
};
