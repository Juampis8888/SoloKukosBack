var express = require('express');
var router = express.Router();
var promise = require('../db/promise.js')

router.get('/', function(req, res, next) {
  res.status(200).json("Conexion correcta");
});

router.post('/login', function(req, res, next) {
  promise.getTypeUsers(req, res);
});

module.exports = router;
