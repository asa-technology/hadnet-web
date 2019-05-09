const { getAllBusinessesFromText } = require('./helpers');

getAllBusinessesFromText(['LLC'])
  .then(res => {
    console.log(res);
    })
  .catch((err) => {
    console.error(err);

  })
