var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development: {
    root: rootPath,
    app: {
      name: 'etherscan'
    },  
    secret: 'ilovenodeexpress', 
    cookie: {
      domain: 'localhost'
    }
  },
  production: {
    root: rootPath,
    app: {
      name: 'etherscan'
    },
    secret: 'ilovenodeexpress',  
    cookie: {
      domain: 'localhost'
    }
  }  
}