mysql = require('mysql')

    var connection = mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password : '',
        database : 'projetoNode'
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log("db OK");
      });

module.exports = mysql