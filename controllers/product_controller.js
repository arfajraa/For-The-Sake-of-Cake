var express = require('express');
var router = express.Router();

var product = require('../models/product');

router.get('/', product.getAll, renderIndex);
router.get('/:id', product.find, renderShow);

router.delete('/:id', product.delete, redirectIndex);


function renderIndex(req, res){
    var mustacheData = {
        products: res.locals.products
    }
    res.render("./products/index", mustacheData);
}


function renderShow(req, res){
    var check = false;
    if(req.session.user){
        check = req.session.user.isadmin;
    }
    var mustacheData = {
        isAdmin: check,
        product: res.locals.product
    }
    res.render("./products/show", mustacheData)
}

function redirectIndex(req, res) {
    res.redirect('/products');
}



module.exports = router;