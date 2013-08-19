#!/usr/bin/env node

 var sys = require('sys')
 var exec = require('child_process').exec;
 var prompt = require('prompt');
 var solr = require('solr-client');
 var promptProperties= require("./prompt_properties");
 var SolrCommand= require("./solrCommand");
 var Map = require("collections/map");
 var map = new Map();
 var command=process.argv[2];
 console.log("Comando: "+command);
  if(undefined == command){
    console.log("Listando comandos...");
    return;
  }

  /*Instanciando commands*/
  var search = new SolrCommand("search");
  var start = new SolrCommand("start");

  start.prototype.execute=function(){
    console.log("guilherme");
  }

  /*Atribuindo ao map*/
  map.set(search.getName(), search);
  map.set(start.getName(), start);

  start.config([{
          name: 'port', 
          validator:  /[\d]/,
          warning: 'PortNumber'
        },
        {
          name: 'host', 
          validator:  /[\d]/,
          warning: 'PortNumber'
        }]);

  search.config([{
          name: 'query', 
          validator: /^[a-zA-Z\s\-]+$/,
          warning: 'PortNumber'
        },
        {
          name: 'core', 
          validator: /^[a-zA-Z\s\-]+$/,
          warning: 'PortNumber'
        }]);

      prompt.start();
      var commandInstance=map.get(command);
      prompt.get(commandInstance.getConfig(), function (err, result) {
        console.log('Command-line input received:');
        commandInstance.execute();
      });

  
  function onErr(err) {
    console.log(err);
    return 1;
  }