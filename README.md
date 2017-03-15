#Slash Command (Yelp Reviews Integration) for Mixmax

This is an open source Mixmax Slash Command.

What it should look like?

## What it should look like:
#Typeahead<br>
![typeahead](https://github.com/sekale/yelpIntegration/tree/master/screenshots/typeahead.gif)

#Resolver<br>
![resolver](https://github.com/sekale/yelpIntegration/tree/master/screenshots/resolver.gif)

## Running locally

1. Install using `npm install`
2. Run using `npm start`

```
To use this feature you need Yelp API V2 authentication keys and place them in a .env file in the root directory:
The .env file should contain the following lines:

consumer_key = SECRET CONSUMER KEY
consumer_secret = SECRET CONSUMER SECRET
token = SECRET CONSUMER TOKEN
token_secret = SECRET CONSUMER TOKEN SECRET

To obtain Yelp API v2 keys which is required for this feature: https://www.yelp.com/developers/v2/manage_api_keys

Additional Required Packages:
yelp
dotenv