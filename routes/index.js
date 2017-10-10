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
      authToken = response.data.access_token;

      async.parallel([doQuery1, doQuery2], function (err) {
        clientRes.render('index',
          {
            title: 'Express',
            graphData: queryData
          });
      });
    })
    .catch(function (error) {
    });
}


var doQuery1 = function (done) {
  //"SELECT Producto2.Servicio__c, Producto2.Tipo_de_servicio__c, (SELECT OpportunityLineItem.Quantity, OpportunityLineItem.TotalPrice From Product2.OpportunityLineItems) FROM Product2"
  //"SELECT Quantity, TotalPrice, (SELECT Servicio__r, Tipo_de_servicio__r FROM Product2) FROM OpportunityLineItem"
  //"SELECT Quantity, TotalPrice,PriceBookEntry.Product2.Tipo_de_servicio__c, PriceBookEntry.Product2.Servicio__c FROM OpportunityLineItem"
  //"SELECT SUM(TotalPrice) y,PriceBookEntry.Product2.Servicio__c name FROM OpportunityLineItem Group by PriceBookEntry.Product2.Servicio__c"
  var queryStr = "SELECT SUM(TotalPrice) total,PriceBookEntry.Product2.Servicio__c,PriceBookEntry.Product2.Tipo_de_servicio__c FROM OpportunityLineItem Group by rollup(PriceBookEntry.Product2.Tipo_de_servicio__c,PriceBookEntry.Product2.Servicio__c)";
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
      return done(error);
    });
}

var doQuery2 = function (done) {
  //"SELECT Producto2.Servicio__c, Producto2.Tipo_de_servicio__c, (SELECT OpportunityLineItem.Quantity, OpportunityLineItem.TotalPrice From Product2.OpportunityLineItems) FROM Product2"
  //"SELECT Quantity, TotalPrice, (SELECT Servicio__r, Tipo_de_servicio__r FROM Product2) FROM OpportunityLineItem"
  //"SELECT Quantity, TotalPrice,PriceBookEntry.Product2.Tipo_de_servicio__c, PriceBookEntry.Product2.Servicio__c FROM OpportunityLineItem"
  var queryStr = "SELECT SUM(TotalPrice) y,PriceBookEntry.Product2.Tipo_de_servicio__c name FROM OpportunityLineItem Group by PriceBookEntry.Product2.Tipo_de_servicio__c";
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
      queryData.query2 = response.data.records;
      return done(response);
    })
    .catch(function (error) {
      console.log(error);
      return done(error);
    });
}


router.get('/', function (req, res, next) {
  authTokenObtain(res);
});

module.exports = router;
