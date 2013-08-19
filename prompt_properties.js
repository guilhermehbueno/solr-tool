var Map = require("collections/map");

var map = new Map();
module.exports = {
		add: function(key, hash){
			console.log("Executing add..."+key);
			map.set(key, hash);
		},
		get: function(key){
			console.log("Executing get..."+key);
			return map.get(key);
		}
}; 

