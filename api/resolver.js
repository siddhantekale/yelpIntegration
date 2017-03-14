var request = require('request');
var _ = require('underscore');
var Yelp = require('yelp');

var yelp = new Yelp({
 consumer_key: 'GqZQ9OM30OEV9-ovZl-sPg',
  consumer_secret: 'alOrFdEQElm_5jSxAgnSE5QXNVs',
  token: '_YxSdeLE9x2Koc8PopvMAxudEdxs66DN',
  token_secret: '5EMiECqGns-2WnWSwEhR6QzB2Qs',
});

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  yelpReviewSearch(term, req, res);
  //handleSearchString(term, req, res);
};

function yelpReviewSearch(id, req, res)
{
  console.log(id);
  yelp.business(id)
  .then(function (data) {
    console.log(data.rating); // print the data returned from the API call
    var width = data.rating_img_url_small.width > 200 ? 200: data.rating_img_url.width;
    var businessName = '<a href=' + data.url + '>' +  data.name  + '</a>';
    var starImg = '<img style="max-width:100%;" src="' + data.rating_img_url_small + '" width="' + width + '"/>';
    res.json({
    body: businessName + "\n" + starImg + "\n" + data.location.address,
    raw: true
  });

  })
  .catch(function (err) {
    console.error(err);
  });

}