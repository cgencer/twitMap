module.exports = function(cfg, app){
	app.get("/", function(req, res){
		res.render('index', {} );
	});
}