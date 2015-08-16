NodeJS :
Run nodejs component through nodejs server as below ( install the dependent elastic search and other modules thro npm install)
node cbmonitor-nodejs-app
or run through cloud foundry as below
cf push cbmonitor.js -b https://github.com/cloudfoundry/nodejs-buildpack --no-route

Elastic Search :
Create a template for elastic search index as below, this enables to store the _timestamp field 

{
"template":"cbstat*","order":1,
"settings":{"number_of_shards":3},
"mappings" : {

"_default_":{ "_timestamp" : { "enabled" : true,"store" : true }

	}
}
}

Kibana :
Under advanced options, set the below
dataformat  to unix time format 'x' 
Add additional metafield _timestamp to the list 
Refresh the fields

