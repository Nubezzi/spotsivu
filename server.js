const express = require('express');
const request = require('request');

const app = express();

app.get('/proxy', (req, res) => {
  // Get the URL to request from the query string
  const url = req.query.url;

  // Make the request to the desired URL
  request(url, (error, response, body) => {
    if (response.statusCode != 200) {
      // Handle any errors
      res.status(500).send(new Error('Fetch from API failed'));
    } else {
      // Add the necessary headers to the response
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      });

      // Send the response back to the client
      res.send(body);
    }
  });
});

app.listen(5000, () => {
  console.log('Proxy server listening on port 5000');
});