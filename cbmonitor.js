/*
 * Author : Aravindakumar Venugopalan
 * Purpose is to collect metrics from couchbase nodes and visualize the metrics in dashboards through Kibana
 * 
 */

// Add dependent modules..
var throng = require('throng');
var http=require('http');
var elasticsearch = require('elasticsearch');

// Elastic Search connection
var client = elasticsearch.Client({  hosts: ['elasticsearchserver:9200']});

// http connection to hit couchbase metrics
var url = 'http://readonlyuser:readonlyuserpassword@couchbaseserverip:8091/pools/default/buckets/[bucket-name]/stats';
var WORKERS = process.env.WEB_CONCURRENCY || 2;

// Run through worker threads..
throng(start, {
  workers: WORKERS,
  lifetime: Infinity
});

// Collect the metrics through 60 seconds interval..
function start() {
setInterval(function(){
   collect();
}, 60 * 1000);
}

// Collects the metrics from http url , parse and store in Kibana 
function collect()
{
http.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var metricsResponse = JSON.parse(body);
			// Dump the whole stat in json format to elastic search index..
        client.index({
			index: 'cbstat',
			type: 'metrics',
			id: metricsResponse.op.lastTStamp,
			timestamp : metricsResponse.op.lastTStamp,
			body:  metricsResponse
			},
         function (err, resp) {
         if(err)
		 {
			console.log(err);  
		 }
		 if(resp)
		 {
			console.log(resp);
		 }
});
    });
}).on('error', function(e) {
      console.log("Error : ", e);
});
}
