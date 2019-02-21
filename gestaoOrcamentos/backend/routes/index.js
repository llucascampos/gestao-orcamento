var express = require('express');
var router = express.Router();
var connection = require('../banco/db.js')

    router.get('/', function(req, res){
        res.send({nome: 'campos', idade: 23})
    
    })
    
    // app.get('/usuarios', function(req, res, next) {
    //     connection.query('SELECT * from users', function (error, results, fields) {
    //         if (error) throw error;
    //         res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    //     });
    // });

module.exports = router
    
