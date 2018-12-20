var express = require('express');
var router = express.Router();

var user = require('../models/user');
var order = require('../models/order')
var auth = require('../middleware/auth');

router.get('/signup', renderNew);

router.get('/order', auth.restrict, user.find, renderOrder);

// router.get('/toohot', renderAdminSignup);

router.get('/orders', order.findForUser, renderOrders);

router.get('/profile', auth.restrict, redirectShow);

router.get('/orders/:id', order.findItems, auth.restrict, renderOrderItems) 

router.get('/:username/edit', auth.restrict, user.find, renderEdit);

router.get('/:username', auth.restrict, user.find, renderShow);



//, auth.onlyUsers

router.post('/', user.create, redirectShow);
// router.post('/toohot', user.adminCreate, redirectShow);
router.post('/orders', order.create, redirectOrders);

router.put('/:username', user.update, redirectShow);

function renderNew(req, res){
  res.render('./users/signup');
}

function renderEdit(req, res){
    mustacheData = {
        user: res.locals.user
    }
    res.render('./users/edit', mustacheData);
}

// function renderAdminSignup(req, res){
//     res.render('./users/adminSignup');
// }

function renderShow(req, res) {
//   console.log(req.session.user)
  var mustacheData = {
    user: res.locals.user
  }
  res.render('./users/profile', mustacheData);
}

function renderOrder(req, res){
    res.render(`./users/order`);
}

function renderOrders(req, res){
    var mustacheData = {
        orders: res.locals.orders
    }
    res.render('./users/orders', mustacheData);
}

function renderOrderItems(req, res){
    var mustacheData = {
        orderItems: res.locals.orderItems
    }
    res.render('./users/orderitems', mustacheData);
}

function redirectOrders(req, res){
    res.redirect('/users/orders');
}

function redirectShow(req, res) {
  res.redirect(`/users/${req.session.user.username}`);
}

module.exports = router;