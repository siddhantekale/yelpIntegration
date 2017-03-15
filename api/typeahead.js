var request = require('request');
var _ = require('underscore');

var Yelp = require('yelp');

var yelp = new Yelp({
 consumer_key: 'GqZQ9OM30OEV9-ovZl-sPg',
  consumer_secret: 'alOrFdEQElm_5jSxAgnSE5QXNVs',
  token: '_YxSdeLE9x2Koc8PopvMAxudEdxs66DN',
  token_secret: '5EMiECqGns-2WnWSwEhR6QzB2Qs',
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
    var businessMap = new Map();
    for(i = 0 ; i < 3; ++i){
      if(data.businesses[i].id){
        results[i] = ({
          title : data.businesses[i].name + data.businesses[i].location.address,
          text : data.businesses[i].id
        });
      }
      else{
        break;
      }
    }

    console.log(results);

    res.json(results);

    // for(var[key,value] of businessMap.entries()){
    //   console.log(key + ' = ' + value);
    // }
  })


  // request({
  //   url: 'http://api.giphy.com/v1/gifs/search',
  //   qs: {
  //     q: term,
  //     limit: 15,
  //     api_key: key
  //   },
  //   gzip: true,
  //   json: true,
  //   timeout: 10 * 1000
  // }, function(err, response) {
  //   if (err || response.statusCode !== 200 || !response.body || !response.body.data) {
  //     res.status(500).send('Error');
  //     return;
  //   }

  //   var results = _.chain(response.body.data)
  //     .reject(function(image) {
  //       return !image || !image.images || !image.images.fixed_height_small;
  //     })
  //     .map(function(image) {
  //       return {
  //         title: '<img style="height:75px" src="' + image.images.fixed_height_small.url + '">',
  //         text: 'http://giphy.com/' + image.id
  //       };
  //     })
  //     .value();

  //   if (results.length === 0) {
  //     res.json([{
  //       title: '<i>(no results)</i>',
  //       text: ''
  //     }]);
  //   } else {
  //     res.json(results);
  //   }
  // });

};