const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.use((req, res, next) => {
  const error = new Error('Not Found - 4(req.orginalUrl');
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // Check whether status code is 200, then convert to 500, else res.status code
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '',
  });
}); 

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log('Listening at http://localhost:{port}');
});
;