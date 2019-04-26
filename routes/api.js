/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        
      var _num = (""+initNum+"").replace(/\./,"");
      var testNum = _num.replace(/\//,"");
      
      //res.json
      if(testNum.match(/\D/) && typeof convertHandler.spellOutUnit(initUnit)!=='undefined'){
        res.type('text').send('invalid number');
      }
      else if(typeof convertHandler.spellOutUnit(initUnit)==='undefined' && testNum.match(/\D/)){
        res.type('text').send('invalid number and unit');
      }
      else if(typeof convertHandler.spellOutUnit(initUnit)==='undefined'){
        res.type('text').send('invalid unit');
      }
      else{
        res.send({"initNum":initNum,"initUnit":initUnit,"returnNum":returnNum,"returnUnit":returnUnit,"string":toString})
      }
    });
    
};
