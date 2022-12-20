const express = require('express');
const request = require('request');
const path = require('path'); 
const PORT = process.env.PORT || 5000;

const app = express();


app.get('/api/:data', (req, res) => {
  // Get the URL to request from the query string
  const data = req.params.data
  const url = 'http://api.spot-hinta.fi/' + data;

  // Make the request to the desired URL
  request(url, (error, response, body) => {
    if (response.statusCode != 200) {
      // Handle any errors
      res.sendStatus(500);
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

app.use(express.static(path.join(__dirname, "Client/build")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "Client/build", "index.html"));
});


app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});