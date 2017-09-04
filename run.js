var dnsd = require('dnsd')
var bs58 = require('bs58')
var zlib = require('zlib')
var get = require('simple-get')

var DOMAIN = "1337.nl"
 
var server = dnsd.createServer(handler)
server.listen(5353, '127.0.0.1')
console.log('Server running at 127.0.0.1:5353')

function handler(req, res) {
	console.log('%s:%s/%s %j', req.connection.remoteAddress, req.connection.remotePort, req.connection.type, req)
 
	var question = res.question[0]
		, hostname = question.name
	
	var match = question.name.match('^(.+)\\.'+DOMAIN+'$') || res.end()
	
	// TODO: efficient short string compression (smaz?)
	var url = bs58.decode(match[1]).toString()

	get.concat(url, function(e, r, data) {
		// TODO: compression (gzip?)
		var bdata = bs58.encode(data)
		for(var i=0; i*50<bdata.length; i++) {
			res.answer.push({
				name: 'x' + i + '.' + hostname,
				type: 'TXT',
				data: bdata.substr(i*50, 50),
				ttl: 0
			})
		}

		res.end()
	});
}
