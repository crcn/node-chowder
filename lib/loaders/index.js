var fs = require('fs'),
findit = require('findit'),
fglob = require('fglob'),
loaders = {},
Structr = require('structr'),
path = require('path')


function includeConfigs(ops, callback)
{
	var config = ops.config;
	
	if(config.include)
	{
		fglob(config.include.files, { cwd: path.dirname(ops.source) }, function(files)
		{
			var numLoading = files.length;
			
			files.forEach(function(file)
			{
				ops.source = file;
				
				load(ops, function()
				{
					if(!(--numLoading)) callback(true);
				});
			})
		});
	}
	else
	{
		callback(true);
	}
}


var load = exports.load = function(ops, callback)
{
	ops.source = fs.realpathSync(ops.source);
	
	//already loaded config files
	if(!ops.used) ops.used = {};
	
	if(ops.used[ops.source]) return callback(true, ops.config);
	
	ops.used[ops.source] = 1;
	
	var loader = loaders[ops.source.match(/\w+$/g)[0]];
	
	
	//parse the config. could be ini, json, etc.
	ops.config = Structr.copy(loader.parse(fs.readFileSync(ops.source,'utf8')), ops.config);
	
	//after parsing, need to recursively load any dependencies
	includeConfigs(ops, function()
	{
		callback(false, ops.config);
	});
	
}

findit.findSync(__dirname).forEach(function(src)
{
	var name = src.match(/(\w+)\.js$/)[1];
	
	//skip the index, because that's *this* script
	if(!name || name == 'index') return;
	
	var module = require(src);
	
	//exts = files handlable by loader
	module.ext.forEach(function(ext)
	{
		loaders[ext] = module;
	});
})


