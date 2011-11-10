var chowder = require('../');


chowder.load(__dirname + '/test.conf', function(err, settings)
{
	console.log(settings)
});