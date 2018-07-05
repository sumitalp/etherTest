// Read JSON data
var env = process.env.NODE_ENV || 'production';
var config = require('../../../config/config')[env];
var rootPath = config.root;
const util = require('util');
require('util.promisify').shim();
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);

module.exports = {
    readFileResults: (req, res, filter='') => {
        readFileAsync(`${rootPath}/public/data.json`, {encoding: 'utf8'})
        .then(contents => {
            const obj = JSON.parse(contents)
            // console.log(obj.results)
            const sortParam = req.query.sort;
            var items = obj.result;
            const order = req.query.order_by;

            items = module.exports.sortData(items, sortParam, order);
            // console.log(filter);
            if(filter !== ''){
                items = items.filter(function(el){
                    return parseInt(el.blockNumber, 16) == filter;
                })
            }
            
            res.format({
                // html: function(){
                //     res.render(rootPath + '/app/etherscan/views/lists', {blocks: items});
                // },
                json: function(){
                    res.status(200).json({
                        "blocks": items
                    });
                }
            });
        })
        .catch(error => {
            throw error
        })
    },

    sortData: (items, sortParam, order) => {
        if (sortParam == 'block'){
            items = items.sort(function(a, b){
                if(order==='asc'){
                    return parseInt(a.blockNumber, 16) - parseInt(b.blockNumber, 16);
                }
                if(order==='desc'){
                    return parseInt(b.blockNumber, 16) - parseInt(a.blockNumber, 16);
                }
            })
        } else if (sortParam == 'gasprice'){
            items = items.sort(function(a, b){
                if(order==='asc'){
                    return parseInt(a.gasPrice, 16) - parseInt(b.gasPrice, 16);
                }
                if(order==='desc'){
                    return parseInt(b.gasPrice, 16) - parseInt(a.gasPrice, 16);
                }
            })
        } else if (sortParam == 'gasused'){
            items = items.sort(function(a, b){
                if(order==='asc'){
                    return parseInt(a.gasUsed, 16) - parseInt(b.gasUsed, 16);
                }
                if(order==='desc'){
                    return parseInt(b.gasUsed, 16) - parseInt(a.gasUsed, 16);
                }
            })
        }
        return items;
    }
}