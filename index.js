const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyparser.json());

//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tutorialclassaope',
    multipleStatements: true
});

mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/class' , (req, res) => {
        mysqlConnection.query('SELECT * FROM class', (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
        })
} );


//Router to GET specific learner detail from the MySQL database
app.get('/class/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM class WHERE id = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
} );


//Router to INSERT/POST a learner's detail
app.post('/class', (req, res) => {
    let classes = req.body;
    var sql = "SET @id = ?;SET @classname = ?;SET @course = ?; CALL classAddorEdit(@id,@classname,@course);";
        mysqlConnection.query(sql, [classes.id, classes.classname, classes.course], (err, rows, fields) => {
        if (!err)
        rows.forEach(element => {
            if(element.constructor == Array)
            res.send('New Class ID : '+ element[0].id);
        });
        else
            console.log(err);
    })
});