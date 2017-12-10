var path = require('path');
var rootPath = path.normalize(__dirname+'/../..');
module.exports={
    development:{
        db:     'mongodb://localhost:27017/multivision',
        rootPath: rootPath,
        port:process.env.PORT ||3030

    },
    production:{
        db:     'mongodb://dummyuser:dummypassword@ds249325.mlab.com:49325/multivision',
        rootPath: rootPath,
        port:process.env.PORT ||80
    }
}