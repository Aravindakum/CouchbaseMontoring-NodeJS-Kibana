Run nodejs component through nodejs server as below ( install the dependent elastic search and other modules thro npm install)
node cbmonitor-nodejs-app
or run through cloud foundry as below
cf push cbmonitor-nodejs-app -b https://github.com/cloudfoundry/nodejs-buildpack --no-route

Elastic Search :
Create a template for elastic search index as below

{
"template":"cbstat*","order":1,
"settings":{"number_of_shards":3},
"mappings" : {

"_default_":{ "_timestamp" : { "enabled" : true,"store" : true }

	}
}
}

Kibana :
Set the dataformat in advanced options to unix time format 'x' 
Add additional metafield _timestamp to the list and refresh 
