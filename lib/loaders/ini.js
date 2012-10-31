var ini = require('iniparser'),
dref    = require("dref");

exports.ext = ['conf','cnf','ini']


exports.parse = function(src) {
	var cfg = ini.parseString(src),
	deepCfg = {};
	
	for(var key in cfg) {
		dref.set(deepCfg, key.replace(/\:+/g, "."), cfg[key]);
	}

	return deepCfg;
}


exports.stringify = function(value)
{
	//todo
}