var express = require('express');
var router = express.Router();
var axios = require('axios');
var async = require('async');
var _ = require('underscore');
var authToken;
var queryData = {
  query1: [],
  query2: [],
  query3: [],
  query4: []
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
  //SELECT Amount, Gerente_de_cuenta__c from Opportunity WHERE Gerente_de_cuenta__c != null
  //SELECT Apellidos__c from Salesman__c
  //SELECT SUM(Amount) total, Gerente_de_cuenta__r.Gerente_comercial__r.Apellidos__c, Gerente_de_cuenta__r.Apellidos__c FROM Opportunity WHERE Gerente_de_cuenta__c != null Group by rollup(Gerente_de_cuenta__r.Gerente_comercial__r.Apellidos__c,Gerente_de_cuenta__r.Apellidos__c)
  var queryStr1 = "SELECT SUM(Amount) total, Gerente_de_cuenta__r.Gerente_comercial__c idPadre, Gerente_de_cuenta__r.Apellidos__c FROM Opportunity WHERE Gerente_de_cuenta__c != null Group by rollup(Gerente_de_cuenta__r.Gerente_comercial__c,Gerente_de_cuenta__r.Apellidos__c)";
  axios.get('https://na73.salesforce.com/services/data/v20.0/query',
    {
      params: {
        "q": queryStr1
      },
      headers: {
        "Authorization": "Bearer " + authToken
      }
    })
    .then(function (response1) {

      var queryStr2 = "SELECT  Id, Apellidos__c FROM Salesman__c";
      axios.get('https://na73.salesforce.com/services/data/v20.0/query',
        {
          params: {
            "q": queryStr2
          },
          headers: {
            "Authorization": "Bearer " + authToken
          }
        })
        .then(function (response2) {

          console.log(response2);

          var indexed = _.indexBy(response1.data.records, 'Apellidos__c');

          var result = _.map(response2.data.records, function(obj) {
            var master = indexed[obj.Apellidos__c];
            return _.extend({}, master, obj);
          });

          queryData.query2 = result;
          return done(response2);
        })
        .catch(function (error) {
          console.log(error);
          return done(error);
        });

      //queryData.query2 = response.data.records;
      //return done(response);
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
