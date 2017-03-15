# Slash Command (Yelp Reviews Integration) for Mixmax

This is an open source Mixmax Slash Command.

What it should look like?

## What it should look like:
#Typeahead<br>
![Typeahead](https://github.com/sekale/yelpIntegration/tree/master/screenshots/typeahead.gif)

#Resolver<br>
![Resolver](https://github.com/sekale/yelpIntegration/tree/master/screenshots/resolver.gif)

## Running locally

1. Install using `npm install`
2. Run using `npm start`
3. Add a Mixmax Slash Command in your Mixmax dashboard. (Call it soundcloud) Using:<br>
   Typeahead API URL: http://localhost:9145/typeahead<br>
   Resolver API URL: http://localhost:9145/resolver
4. Quit Chrome and restart it using the following command on OS X: `open -a Google\ Chrome --args --ignore-certificate-errors`. See [here](http://developer.mixmax.com/docs/integration-api-appendix#local-development-error-neterr_insecure_response) for why.
5. Compose an email in Gmail using Mixmax and type /yelpReview [Type Restaurant/Business Name]

## Yelp API Key Authentication

To use this feature you need Yelp API V2 authentication keys and place them in a .env file in the root directory:
The .env file should contain the following lines:

consumer_key = SECRET CONSUMER KEY<br>
consumer_secret = SECRET CONSUMER SECRET<br>
token = SECRET CONSUMER TOKEN<br>
token_secret = SECRET CONSUMER TOKEN SECRET<br>

To obtain Yelp API v2 keys which is required for this feature: https://www.yelp.com/developers/v2/manage_api_keys

## Additional Required Packages:
yelp
dotenv

