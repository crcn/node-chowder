var chowder = require('../');


chowder.load(__dirname + '/test.conf', function(settings)
{
	console.log(settings)
});