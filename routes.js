var express = require('express');
var router = express.Router();


//require the Twilio module and create a REST client 
	//var client = require('twilio')(accountSid, authToken); 
// settings
router.get('/', function(req, res) {
	
  // skip setup
  /*if (req.session.settings && req.session.contacts) {
    return res.redirect('/interface');
  }*/
	
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
	var num = req.session.settings.length;
    return res.render('interface', {
    title: 'Rehabilitate',
	sets: req.session.settings[num - 1].sets,
	reps: req.session.settings[num - 1].reps
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

//TWILIO
/*router.post('/twilio', function(req, res) {
	client.messages.create({
		body: "THEY DIDN'T REHABILITATE"
	}, function(err, message) { 
		console.log(message.sid); 
	});
});*/

module.exports = router;
