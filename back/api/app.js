const express = require("express");
const cors = require('cors');
const logger = require('morgan');
require("dotenv").config();
// const poolClient = require('./poolClient')
// const db = require('./models');

const userRoutes = require('./routes/userRoutes');
const spotRoutes = require('./routes/spotRoutes');
const albumRoutes = require('./routes/albumRoutes');
const pictureRoutes = require('./routes/pictureRoutes');

// const HttpError = require('./models/http-error');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json()); //Used to parse JSON bodies
app.use(cors());
app.use(logger('dev'));

app.use('/api/users', userRoutes);
app.use('/api/spots', spotRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/pictures', pictureRoutes);

// app.use((req, res, next) => {
//     const error = new HttpError('Could not find this route.', 404);
//     throw error;
//   });
  
//   app.use((error, req, res, next) => {
//     if (res.headerSent) {
//       return next(error);
//     }
//     res.status(error.code || 500)
//     res.json({message: error.message || 'An unknown error occurred!'});
//   });

app.listen(port, () => console.log(`Server started on ${port}`));

module.exports = app;