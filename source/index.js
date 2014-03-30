var theApp = (function(theApp, undefined) {

	var fs = require("fs"),
		io = require('socket.io'),
		http = require('http'),
		twitter = require('ntwitter'),
		cronJob = require('cron').CronJob,
		_ = require('underscore'),
		path = require('path');

	var env = process.env.NODE_ENV || 'development',
		cfg = require('./config')[env];

		_.str = require('underscore.string');
		_.mixin(_.str.exports()),
		_.str.include('Underscore.string', 'string');

	var app = express();
	var compile = function(str, path) {
		return stylus(str).set('filename', path).use(nib());
	}

	app.configure('development', function () {app.use(express.errorHandler());});
	app.configure(function () {
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.use(express.favicon());
		app.use(express.logger({ immediate: true, format: 'dev' }));
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.session({ secret: 'bukalemun' }));
		app.use( stylus.middleware({ 
			debug: true,
			src: 	__dirname + '/style',
			dest: 	__dirname + "/public/css/",
			compile : function(str, path) {
				console.log('compiling');
				return stylus(str)
					.use(nib())
					.set('filename', path)
					.set('warn', true)
					.set('compress', true)
			}
		}) );
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(express.methodOverride());
		app.use(flash());
		app.use(app.router);
		app.use(express.static(__dirname + '/public'));
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});
	require('./routes')(config);

	process.on('uncaughtException', function(err) {
		if(err.errno === 'EADDRINUSE') {
			console.log("Port in use!");
		} else {
			console.log(err);
		}
		process.exit(1);
	});
	app.use(function(req, res, next){
		res.status(404);
		if (req.accepts('html')) {
			res.render('404', { url: req.url });
			return;
		}
		if (req.accepts('json')) {
			res.send({ error: 'Not found' });
			return;
		}
		res.type('txt').send('Not found');
	});
	var port = process.env.PORT || 5000;
	app.listen(port, function() {
		console.log("Listening on " + port);
	});

}(theApp = theApp || {} ));