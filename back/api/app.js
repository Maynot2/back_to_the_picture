const express = require('express');

const usersRoutes = require('./routes/users-routes');
const spotsRoutes = require('./routes/spots-routes');
const albumsRoutes = require('./routes/albums-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use(express.json()); //Used to parse JSON bodies

app.use('/api/users', usersRoutes); // => /api/users..
app.use('/api/spots', spotsRoutes);
app.use('/api/albums', albumsRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);