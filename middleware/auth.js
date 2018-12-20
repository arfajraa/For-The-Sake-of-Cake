var auth = {};

auth.restrict = function(req, res, next){
  if(req.session.user){
    next();
  }else{
    res.redirect('/login');
  }
}

auth.onlyUsers = function(req, res, next){
  if (req.session.user) {
    next();
    if(req.params.username == req.session.user.username){
      next();
    }else{
      res.redirect(`/users/${req.session.user.username}`);
    }
  } else {
    res.redirect('/login');
  }
}



module.exports = auth;