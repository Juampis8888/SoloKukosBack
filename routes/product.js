var express = require('express');
var router = express.Router();
var promise = require('../db/promise.js')

router.get('/getproducts', function(req, res, next) {
    promise.getProducts(req,res)
});

router.post('/getproductcategory', function(req, res, next) {
    promise.getProductCategory(req,res)
});

router.post('/createproduct', function(req, res, next) {
    promise.createProduct(req,res)
});

router.post('/updateproduct', function(req, res, next) {
    promise.updateProduct(req,res)
});

router.post('/deleteproduct', function(req, res, next) {
    promise.deleteProduct(req,res)
});

module.exports = router;