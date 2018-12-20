var db = require('../db/dbconfig');

var product = {};

product.getAll = function(req, res, next){
    db.manyOrNone("SELECT * FROM products;")
    .then(function(result){
        res.locals.products = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

product.find = function(req, res, next){
    db.oneOrNone("SELECT * FROM products WHERE id=$1;", [req.params.id])
    .then(function(result){
        res.locals.product = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

product.delete = function (req, res, next) {
    db.none("DELETE FROM products where id=$1;", [req.params.id])
        .then(function () {
            console.log("delete successful");
            next();
        })
        .catch(function (err) {
            console.log(err);
            next();
        })
}

module.exports = product;