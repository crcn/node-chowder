var loaders = require('./loaders'),
evaluator = require('./evaluator'),
Structr = require('structr');

exports.load = function(source, callback)
{
	var sources = source instanceof Array ? source : [source],
	allCfg = {},
	numRunning = sources.length;
	
	sources.forEach(function(source)
	{
		loaders.load({ source: source }, function(err, config)
		{
			Structr.copy(config, allCfg);
			
			if(!(--numRunning)) callback(allCfg);
		});
	});
	
}