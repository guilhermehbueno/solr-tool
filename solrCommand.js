module.exports=function(commandName){
	this.properties=[]
	this.command=commandName;
	this.getName=function (){
		return this.command;
	}
	this.log=function (){
		console.log("Command: "+this.command);
	}
	this.config=function(hash){
		console.log(hash)
		if(hash instanceof Array){
			this.properties=hash;
		}else{
			this.properties.push(hash);
		}
	}
	this.getConfig=function(){
		return this.properties;
	}
	this.prototype.execute=function(result){
		console.log("Executing..."+this.command);
	}
}