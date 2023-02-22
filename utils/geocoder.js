const NodeGeocoder = require('node-geocoder')
const https = require("https");

const options={
    provider:process.env.GEOCODER_PROVIDER,
    httpAdapter:https,
    apikey:process.env.GEOCODER_API_KEY,
    formatter:null
}

const geocoder=NodeGeocoder(options);
module.exports=geocoder;