const { getAllBusinessesFromText } = require('./helpers');

getAllBusinessesFromText()
  .then(res => {
    console.log(res);

  })
  .catch((err) => {
    console.error(err);

  })
