var request = require('request');
var _ = require('underscore');
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret,
});

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  yelpReviewSearch(term, req, res);
};

function yelpReviewSearch(id, req, res)
{
  console.log(id);
  yelp.business(id)
  .then(function (data) {
    console.log(data.rating); // print the data returned from the API call
    var width = data.rating_img_url_small.width > 200 ? 200: data.rating_img_url.width;
    var businessName = '<a href=' + data.url + '>' +  data.name  + '</a>';
    var ratingsStarHtmlTag = '<img style="max-width:100%;" src="' + data.rating_img_url_small + '" width="' + width + '"/>';
    //converts the address into a queryable form
    var retAddr = getAddressString(data.location.address + '') + '';
    var embedMapAddress = '<a href =\"https://www.google.com/maps/?q=' + retAddr + '\">' +  data.location.address  + '</a>';
    res.json({
    body: businessName + ratingsStarHtmlTag + embedMapAddress,
    raw: true
  });

  })
  .catch(function (err) {
    console.error(err);
  });

}

function getAddressString(addressString, retAddr)
{
  var retAddr = '';
  var tempAddrArray = addressString.split(" ");  
  var arrayLength = tempAddrArray.length;
  for(i = 0; i < arrayLength; ++i){
    retAddr += tempAddrArray[i];
    retAddr += '+';
  }
  retAddr = retAddr.substring(0, retAddr.length - 1);
  //console.log(retAddr);
  return retAddr;
}
