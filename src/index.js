const express = require('express');
const mongoose = require('mongoose');
const Respondent = require('./model/Respondent');
const respondentRoutes = require('./routes/respondentRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/respondent', respondentRoutes);

app.listen(port, '0.0.0.0');

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

console.log(`Running on port ${port}`);
