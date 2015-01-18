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
	reps: req.session.settings[num - 1].reps,
    name: req.session.settings[num - 1].name
  });
});

// contact consequence
router.get('/finish', function(req, res) {
  return res.render('finish', {
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

  return res.redirect('/interface');
});

//TWILIO
/*router.post('/twilio-alarm', function(req, res) {
	client.messages.create({
		to: "+12673193238",
		from: "+12673146330",
		body: "Heya! 5 minutes till you move those muscles :)"
	}, function(err, message) { 
		console.log(message.sid);
	});

    return res.redirect('/interface');
});


router.post('/twilio-warning', function(req, res) {
	client.messages.create({
		to: "+12673193238",
		from: "+12673146330",
		body: "Uh oh, 10 minutes till you run out of time!"
	}, function(err, message) { 
		console.log(message.sid); 
	});
	
    return res.redirect('/interface');
});

router.post('/twilio-notify', function(req, res) {
	client.messages.create({
		to: "+12673193238",
		from: "+12673146330",
		body: "Sigh, you only needed a bit of effort! Notifying your buddy :("
	}, function(err, message) { 
		console.log(message.sid); 
	});

    return res.redirect('/interface');
}); */

// POSTMATES
/*router.post('/postmate', function(req, res) {
	var url = 'https://api.postmates.com';
	var quote = '/v1/customers/:customer_id/delivery_quotes';
	getJSON(user, function(json) {
		console.log(json);
	});
});

function getJSON(url, callback) {
	  $.ajax({
		url: url,
		complete: function(xhr) {
		  callback.call(null, xhr.responseJSON);
		}
	  });
}*/

module.exports = router;
