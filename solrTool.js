#!/usr/bin/env node

 var sys = require('sys')
 var exec = require('child_process').exec;
 var prompt = require('prompt');
 var solr = require('solr-client');
 var solrSearch = require('./lib/solrSearch');


  var command=process.argv[2];
  // print process.argv
  console.log("Comando: "+command);

  if("start" == command){
     var properties = [
        {
          name: 'port', 
          validator:  /[\d]/,
          warning: 'PortNumber'
        },
        {
          name: 'version',
          validator: /[\d]/,
          warning: 'Version of Solr, accepts only main version, ex: 4 or 3'
        }
      ];

       prompt.start();

      prompt.get(properties, function (err, result) {
        console.log('Command-line input received:');
        console.log('  Query: ' + result.port);
        console.log('  Core: ' + result.version);

        function puts(error, stdout, stderr) {  console.log(stdout);}
        if("4" == result.version){
          exec("cd /Users/gbueno1_dsv/Documents/dev/projects/search/solr/solr-4.4.0/example; java -jar -Dsolr.solr.home=marketplace -Djetty.port="+result.port+" start.jar", puts);        
        }

        if("3" == result.version){
          exec("cd /Users/gbueno1_dsv/Documents/dev/projects/search/solr/apache-solr-3.6.2/example; java -jar -Dsolr.solr.home=solrConf  -Djetty.port="+result.port+"  start.jar", puts);        
        }
      });
  }

  if("search" == command){
    /*#######################################*/      
        var properties = [
        {
          name: 'query', 
          validator: /^[a-zA-Z\s\-]+$/,
          warning: 'Username must be only letters, spaces, or dashes'
        },
        {
          name: 'core',
          validator: /^[a-zA-Z\s\-]+$/,
          warning: 'Username must be only letters, spaces, or dashes'
        }
      ];
      //console.log("solrSearch: "+ solrSearch.teste);
      prompt.start();

      prompt.get(properties, function (err, result) {
        if (err) { return onErr(err); }
        console.log('Command-line input received:');
        console.log('  Query: ' + result.query);
        console.log('  Core: ' + result.core);
        var client = solr.createClient('127.0.0.1', '8983', result.core);
        var query2 = client.createQuery()
                           .q({name: result.query})
                           .start(0)
                           .rows(10);
        console.log("####################################################################")
        console.log("##################          RESULTS         ########################")
        console.log("####################################################################")
        client.search(query2,function(err,obj){
           if(err){
            console.log(err);
           }else{
            console.log("Total: "+obj.response.numFound);
            var docs = obj.response.docs;
            docs.forEach( function(document, index){
              console.log(index+" => "+document.id+ " || " +document.name + " || "+ document.categoryName);
            });
           }
        });
      });
   /*#######################################*/      
  }

  if("register" == command){
    /*#######################################*/      
         var properties = [
        {
          name: 'name', 
          validator: /^[a-zA-Z\s\-]+$/,
          warning: 'Username must be only letters, spaces, or dashes'
        },
        {
          name: 'repository',
          validator: /^[a-zA-Z\s\-]+$/,
          warning: 'Username must be only letters, spaces, or dashes'
        }
      ];

      prompt.start();

      prompt.get(properties, function (err, result) {
        if (err) { return onErr(err); }
        console.log('Command-line input received:');
        console.log('  Name: ' + result.name);
        console.log('  Repository: ' + result.repository);
      });
   /*#######################################*/      
  }

  
  function onErr(err) {
    console.log(err);
    return 1;
  }