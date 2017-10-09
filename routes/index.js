var express = require('express');
var router = express.Router();
var axios = require('axios');
var async = require('async');
var authToken;
var queryData = {
  query1:[],
  query2:[],
  query3:[],
  query4:[]
};


var authTokenObtain = function (clientRes) {
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
      console.log(response);
      authToken = response.data.access_token;

      async.parallel([doSalesMenQueries], function (err) {
        clientRes.render('index',
          {
            title: 'Express',
            graphData: queryData
          });
      });


      doSalesMenQueries();
    })
    .catch(function (error) {
      console.log(error);
    });
}


var doSalesMenQueries = function (done) {
  var queryStr = "SELECT name, AnnualRevenue from Account where AnnualRevenue > 100000000";
  axios.get('https://na73.salesforce.com/services/data/v20.0/query',
    {
      params: {
        "q": queryStr
      },
      headers: {
        "Authorization": "Bearer " + authToken
      }
    })
    .then(function (response) {
      console.log(response);
      queryData.query1 = response.data.records;
      return done(response);
    })
    .catch(function (error) {
      console.log(error);
      return done(err);
    });
}

var doSalesqueries = function (done) {
  var queryStr = "SELECT Name, Owner.Name FROM Account";
  axios.get('https://na73.salesforce.com/services/data/v20.0/query',
    {
      params: {
        "q": queryStr
      },
      headers: {
        "Authorization": "Bearer " + authToken
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}


router.get('/', function (req, res, next) {
  authTokenObtain(res);
});

module.exports = router;
