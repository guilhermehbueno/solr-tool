module.exports = function(){
	var  PromptProperties = {
		index: function(){
			console.log("Executing index...");
		}
	};
	return PromptProperties;
}; 


function index(){
	console.log("Executing index...");
	return "Guilherme";
}


exports.index = index;