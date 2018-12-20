var db = require('../db/dbconfig');

var order = {};


order.findForUser = function (req, res, next) {
    db.manyOrNone("SELECT * FROM orders WHERE user_id=$1;", [req.session.user.id])
        .then(function (result) {
            res.locals.orders = result;
            next();
        })
        .catch(function (error) {
            console.log(error);
            next();
        })
}

order.findItems = function (req, res, next){
    db.manyOrNone("SELECT * FROM orderItems WHERE order_id=$1", [req.params.id])
    .then(function (result) {
        res.locals.orderItems = result;
        next();
    })
    .catch(function (error) {
        console.log(error);
        next();
    })
}


order.create = function (req, res, next) {
    var cartObj = req.body.cart;
    // console.log("OMGOMGOMGOMG", cartObj);
    // var newObj = {
    //     bag: []
    // }
    // newObj.bag = req.body.cart;
    // req.body.cart
    // var stringifiedOrderItems = JSON.parse(req.body.orderItems);

    db.one("INSERT INTO orders (user_id, total, status, paymentName, cardNumber, expirationDate) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;",
        [req.session.user.id, req.body.total, req.body.status, req.body.paymentName, req.body.cardNumber, req.body.expirationDate])
        .then(function (result) {
            for (var i = 0; i < cartObj.length; i++){
                db.none("INSERT INTO orderItems (product_id, product_name, product_price, quantity, order_id) VALUES($1, $2, $3, $4, $5);", 
                [cartObj[i].productId, cartObj[i].name, cartObj[i].price, cartObj[i].quantity, result.id])
            }
            res.locals.order = result;
            next();
        })
        .catch(function (error) {
            console.log(error);
            next();
        })
}

module.exports = order;