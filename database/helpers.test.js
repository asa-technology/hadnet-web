const { getAllBusinessesFromText } = require('./helpers');

getAllBusinessesFromText(['L'])
  .then(res => {
    console.log(res);

  })
  .catch((err) => {
    console.error(err);

  })
