// Router for content requests.
const express = require('express');
const clubs = require('./controller/clubs');
const users = require('./controller/users');


// Create the router
const router = express.Router();

// Handle home-page requests
router.get('/', function(request, response) {
  response.render('index');
});

// Handle login requests
router.post('/login', users.login);

// Handle logout requests
router.get('/logout', function(request, response) {
  request.session.user = undefined;
  response.redirect('/');
});

// Handle signup requests
router.get('/signup',function(request, response) {
  response.render('signup');
});
router.post('/users',users.create);

// Create a new Club
router.get('/clubs/new', clubs.new);
router.post('/clubs', clubs.create);

// Handle club-page request
router.get('/clubs', clubs.index);
router.get('/clubs/:id', clubs.retrieve);

// Handle MyAccount page requests
router.get('/users', users.index);

// Update a Club
router.put('/clubs/:id', clubs.update);

router.delete('/clubs/:id',clubs.delete);

// Export the router
module.exports = router;
