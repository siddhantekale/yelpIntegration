var _ = require('underscore');
var Yelp = require('yelp');

//Yelp Authentication: https://www.yelp.com/developers/v2/manage_api_keys
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

function yelpReviewSearch(id, req, res){
  yelp.business(id)
  .then(function (data) {
    var width = data.rating_img_url_small.width > 200 ? 
      200: data.rating_img_url.width;
    //Location attribute variables
    var businessName = '<a href=' + data.url + '>' +  data.name  + '</a>';

    var ratingsStarHtmlTag = '<img style="max-width:100%;" src="' + 
      data.rating_img_url_small + '" width="' + width + '"/>';

    //converts the address into a queryable form
    var retAddr = getAddressString(data.location.address + '', 
      data.location.city + '') + '';

    var embedMapAddress = '<a href =\"https://www.google.com/maps/?q=' + 
      retAddr + '\">' +  data.location.address  + '</a>';

    res.json({
    body: businessName + ' ' + ratingsStarHtmlTag + ' ' + embedMapAddress,
    raw: true
    });
  })
  .catch(function (err) {
    console.error(err);
  });
}
//Converts address to queryable form for e.g. 420 Northwestern Ave = 420+Northwestern+Ave
function getAddressString(addressString, cityName){
  var retAddr = '';
  var tempAddrArray = addressString.split(" ");  
  var tempCityArray = cityName.split(" ");
  var addrArrayLength = tempAddrArray.length;
  var cityArrayLength = tempCityArray.length;

  for(i = 0; i < addrArrayLength; ++i){
    retAddr += tempAddrArray[i];
    retAddr += '+';
  }
  for(i = 0; i < cityArrayLength; ++i){
    retAddr += tempCityArray[i];
    retAddr += '+';
  }
  retAddr = retAddr.substring(0, retAddr.length - 1);
  //console.log(retAddr);
  return retAddr;
}
