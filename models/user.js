var db = require('../db/dbconfig');
var bcrypt = require('bcrypt');

var user = {};


user.find = function (req, res, next) {
    db.oneOrNone("SELECT * FROM users WHERE username=$1;", [req.params.username])
        .then(function (result) {
            res.locals.user = result;
            next();
        })
        .catch(function (error) {
            console.log(error);
            next();
        })
}

user.update = function(req, res, next) {
    db.one(`UPDATE users SET hash_pass = $1, fname = $2, lname = $3, email = $4, phone_number = $5
     WHERE username = $6 RETURNING username;`,
     [bcrypt.hashSync(req.body.password, 10), req.body.fname, req.body.lname, req.body.email, req.body.phone_number, req.params.username])
     .then(function(result){
       console.log(`table updated for ${result.username}`);
       res.locals.username = result.username;
       next();
     })
     .catch(function(error){
      console.log(error);
      next();
    })
  }

user.create = function (req, res, next) {
    db.one("INSERT INTO users (username, hash_pass, fname, lname, email, phone_number) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;",
        [req.body.username.toLowerCase(), bcrypt.hashSync(req.body.password, 10), req.body.fname, req.body.lname, req.body.email.toLowerCase(), req.body.phone_number])
        .then(function (result) {
            req.session.user = result;
            res.locals.username = result.username;
            next();
        })
        .catch(function (error) {
            console.log(error);
            next();
        })
}

// user.adminCreate = function (req, res, next) {
//     db.one("INSERT INTO users (username, hash_pass, fname, lname, email, phone_number, isAdmin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
//         [req.body.username.toLowerCase(), bcrypt.hashSync(req.body.password, 10), req.body.fname, req.body.lname, req.body.email.toLowerCase(), req.body.phone_number, true])
//         .then(function (result) {
//             req.session.user = result;
//             res.locals.username = result.username;
//             next();
//         })
//         .catch(function (error) {
//             console.log(error);
//             next();
//         })
// }

module.exports = user;