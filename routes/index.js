var express = require('express');
var router = express.Router();
var path = require('path');

var resourcePath = path.join(__dirname, '..', 'app/views/');
var etherCtl = require(path.join(resourcePath, '../etherscan/controllers/ether'));

/* GET home page. */
router.get('/', etherCtl.index);
router.get('/api/data/',  etherCtl.list);
router.get('/api/data/:blockid',  etherCtl.show);

module.exports = router;
