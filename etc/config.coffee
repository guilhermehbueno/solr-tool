exports.config =
  from:
    host: 'localhost',
    port: '8983',
    core: '/walmart',
    path: '/solr'

  to:
    host: '127.0.0.1',
    port: '8983',
    core: '/master',
    path: '/solr'
 
  query:'*:*'

 
  rows:2
  start:0

  duplicate:
    enabled: false
    idField:'docid'
    numberOfTimes: 2

  copy:['docid','title']