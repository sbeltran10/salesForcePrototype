var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function (req, res, next) {
    axios.post('https://na73.salesforce.com/services/oauth2/token', {}, {
        params: {
            "grant_type": "password",
            "client_id": "3MVG9g9rbsTkKnAU0YmBTRkdkkQNum.KTNEMTLt.ceuiZr76MHmxzeegvHPJE.7nMUbmAlmxVKkwwbVzdpvnI",
            "client_secret": "6725228515239799075",
            "redirect_uri": "https://localhost:8443/TestApp/oauth/_callback",
            "username": "sbeltran10@bcomcolombia.com",
            "password": "Santforce22a1krCQWE69MLJvhhb4uV7moq"
        },
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }
    })
        .then(function (response) {
            var authToken = response.data.access_token;


        })
        .catch(function (error) {
            console.log(error);
        });
});

var populate = function () {
    //https://yourInstance.salesforce.com/services/data/v20.0/sobjects/Account/ -H "Authorization: Bearer token -H "Content-Type: application/json" -d "@newaccount.json"
    axios.post('https://na73.salesforce.com/services/data/v20.0/sobjects/User/',
        {
            "Alias":"Alvaror2",
            "Username":"AlvaroA",
            "Email":"alvaro2@sales.com",
            
        }, {
            headers: {
                "Authorization": "Bearer " + authToken,
                "Content-Type": "application/json"
            }
        })
        .then(function (response) {
            var authToken = response.data.access_token;


        })
        .catch(function (error) {
            console.log(error);
        });


}