var _ = require('underscore');
require('dotenv/config');

var Yelp = require('yelp');

//Yelp Authentication: https://www.yelp.com/developers/v2/manage_api_keys
var yelp = new Yelp({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret,
});

// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (!term) {  
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }

  var results = [];

  yelp.search({term: term, location: 'San Francisco', limit: 3 })
    .then(function (data) {
    for(i = 0 ; i < 3; ++i){
      //Error Check: whether list has been populated for businesses
      if(data.businesses[i]){
        results[i] = ({
          title : data.businesses[i].name + ' ' + data.businesses[i].location.address,
          text : data.businesses[i].id
        });
      }
      else{
        break;
      }
    }
    res.json(results);
  })
};