var express = require('express');
var router = express.Router();
var promise = require('../db/promise.js')

router.get('/getcategory', function(req, res, next) {
    promise.getCategorys(req,res)
});

router.post('/getidcategory', function(req, res, next) {
    promise.getIdCategory(req,res)
});

router.post('/createcategory', function(req, res, next) {
    promise.createCategory(req,res)
});

router.post('/deletecategory', function(req, res, next) {
    promise.deleteCategory(req,res)
});

module.exports = router;