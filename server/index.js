// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
require('dotenv').config()

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
