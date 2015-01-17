var express = require('express');
var router = express.Router();

// settings
router.get('/', function(req, res) {
  return res.render('index', {
    title: 'Rehabilitate'
  });
});

// contact consequence
router.get('/contact', function(req, res) {
  return res.render('contact', {
    title: 'Rehabilitate'
  });
});

// myo interface
router.get('/interface', function(req, res) {
  return res.render('interface', {
    title: 'Rehabilitate'
  });
});

// settings form
router.post('/set', function(req, res) {
  // require
  if (!(req.body.sets && req.body.reps && req.body.time)) {
    req.session.message = 'You must provide info!';
    return res.redirect('/');
  }

  //save settings
  req.session.settings.push({
    id: req.session.settings.length + 1,
	name: req.body.type,
    sets: req.body.sets,
    reps: req.body.reps,
	time: req.body.time
  });

  req.session.message = 'Settings saved!';
  return res.redirect('/contact');
});

// contact form
router.post('/contact', function(req, res) {
  if (!(req.body.name && req.body.phone)) {
    req.session.message = 'You must provide info!';
    return res.redirect('/contact');
  }

  req.session.contacts.push({
    id: req.session.settings.length + 1,
	name: req.body.name,
	phone: req.body.phone
  });

  req.session.message = 'Contact saved!';
  return res.redirect('/interface');
});

module.exports = router;
