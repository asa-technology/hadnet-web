require('dotenv').config();

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const path = require('path');

// routers
const businesses = require('./routes/businesses');
const community = require('./routes/community');
const user = require('./routes/user.js');
const review = require('./routes/review.js');
const image = require('./routes/image.js');
const sam = require('./routes/sam.js');

// middleware
/**
 * increased bodyParser limit to 10mb in order to process large base64 images
 */
app.use(bodyParser.json({ limit: '10mb', extended: true }));
// app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.static(path.join(__dirname, '../dist/hadnet')));

// businesses route
app.use('/api/business', businesses);
// user route
app.use('/api/user', user);
// community route
app.use('/api/community', community);
// review route
app.use('/api/review', review);
// image route
app.use('/api/image', image);
// sam route
app.use('/api/sam', sam);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
