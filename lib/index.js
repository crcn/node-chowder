var loaders = require('./loaders'),
evaluator = require('./evaluator'),
Structr = require('structr');

exports.load = function(source, callback)
{
	var sources = source instanceof Array ? source : [source],
	allCfg = {},
	numRunning = sources.length;
	
	
	function onLoadedAllConfigs()
	{
		callback({
			get: function(key)
			{
				var keyParts = key.split(':');
				
				var target = allCfg;
				
				while(keyParts.length)
				{
					target = target[keyParts.shift()];
					
					if(!target) return null;
				}
				
				return target;
			},
			doc: allCfg
		});
		
	}
	
	sources.forEach(function(source)
	{
		loaders.load({ source: source }, function(err, config)
		{
			Structr.copy(config, allCfg);
			
			if(!(--numRunning)) onLoadedAllConfigs();
		});
	});
	
}