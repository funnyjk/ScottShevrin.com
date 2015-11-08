var fs = require('fs');

module.exports = function(app) {

	app.get('/', function(req, res) {
		fs.readFile('public/views/templates/ectjs/resume-data.json', function(err, data) {
			if (err)
				console.log('JSON: ' +err);
			data = JSON.parse(data);
			res.render('templates/ectjs/resume-page', data);
		})
	});
	
	app.get('/resume', function(req, res) {
		var resume = 'public/dist/files/resume.pdf';
		var name = 'ScottShevrinResume.pdf';
		fs.readFile(resume, function (err,data){
     res.contentType("application/pdf");
     res.setHeader('Content-disposition', 'inline; filename="' + name + '"');
     res.send(data);
    });
	});

	// app.get('*', function(req, res) {
	// 	res.redirect('/');
	// });
};