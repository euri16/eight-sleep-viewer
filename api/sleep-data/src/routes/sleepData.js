const express = require('express');

const router = express.Router();
const fetch = require('node-fetch');

router.get('/ping', (req, res) => {
  res.send('pong');
});

router.get('/users', (req, res) => {
  res.status(200).json({
    status: 'success',
    users: [
      {
        name: 'Sasha Eslami',
        id: '19326q',
      },
      {
        name: 'Eury Perez',
        id: 'ijcbm',
      },
      {
        name: 'John Doe',
        id: 'olyoy',
      },
    ],
  });
});

router.get('/user/:id', (req, res) => {
  const id = req.params.id;

  const options = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  };

  fetch(process.env.FILES_HOST + id, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong ...');
    })
    .then((response) => {
      res.status(200).json({
        status: 'success',
        intervals: response.intervals,
      });
    })
    .catch((errResponse) => {
      res.status(400).json({
        status: 'error',
        error: errResponse,
      });
    });
});

module.exports = router;
