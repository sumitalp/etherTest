var env = process.env.NODE_ENV || 'production';
var config = require('../../../config/config')[env];
var rootPath = config.root;

const helpers = require('../helpers/utilities');

// Ether controller actions
exports.index = function(req, res){
    res.render(rootPath + '/app/etherscan/views/index', {});
}

exports.show = function(req, res, next){
    helpers.readFileResults(req, res, filter=req.params.blockid);
}

exports.list = function(req, res){
    helpers.readFileResults(req, res);
}