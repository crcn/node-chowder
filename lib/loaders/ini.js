var ini = require('ini');

exports.ext = ['conf','cnf','ini']


exports.parse = ini.parse;


exports.stringify = function(value)
{
	//todo
}