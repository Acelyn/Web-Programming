// Controller for the club collection.
const User = require('../models/user');
const Club = require('../models/club');

// Handle login requests
// Post /login (with a user ID in the request body)
module.exports.login = function(request, response, next) {
  User.findById(request.body.id)
    .then(function(user) {
      if (user) {
        console.log(request.body.id);
        request.session.user = user;
        response.status(200).end();
      } else {
        next(); // No such user
      }
    }).catch(error => next(error));
};

// Handle signup requests
// Post/users
module.exports.create = function(request, response, next) {
  User.create(request.body)
    .then(user => response.status(201).end())
    .catch(error => next(error));
};

// Handle MyAccount requests
// Get/users
module.exports.index = function(request, response, next) {
  Club.find().then(function(clubs) {

    response.render('users/index', {clubs: clubs});

  }).catch(error => next(error));
};


module.exports.new = function(request, response, next) {

  User.distinct('_id')
    .then(userIDs => response.render('/index', {user: {}, userIDs: userIDs}))

    .catch(error => next(error));
}






module.exports.delete = function(request, response, next) {
  User.findByIdAndDelete(request.params.id)
    .then(user => user ? response.status(200).end() : next())
    .catch(error => next(error));
};


module.exports.update = function(request, response, next) {
  User.findByIdAndUpdate(request.params.id, request.body)
    .then(user => user ? response.status(200).end() : next())
    .catch(error => next(error));
};
