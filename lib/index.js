var loaders = require('./loaders'),
evaluator = require('./evaluator');

exports.load = function(source, callback)
{
	loaders.load({ source: source }, function(err, config)
	{
		callback(config);
	});
}