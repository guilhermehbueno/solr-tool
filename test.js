 var SolrCommand= require("./solrCommand");

 var search = new SolrCommand("search");
 var start = new SolrCommand("start");

 search.log();
 start.log();

 search.config({
          name: 'port', 
          validator:  /[\d]/,
          warning: 'PortNumber'
        });

 console.log(search.getConfig());

 search.execute();