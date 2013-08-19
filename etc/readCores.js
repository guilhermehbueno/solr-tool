var fs = require('fs');
var jQuery = require('jquery');
var settings = JSON.parse(fs.readFileSync('config.json', encoding="ascii"));



jQuery.each(settings.cores, function(i, val) {
		var core = val['name']
		console.log(i+" => "+ core);
});