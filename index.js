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


//Creating GET Router to fetch all the class details from the MySQL Database
app.get('/class' , (req, res) => {
        mysqlConnection.query('SELECT * FROM class', (err, rows, fields) => {
                if (!err)
                res.send(rows);
                else
                console.log(err);
        })
} );


//Router to GET specific class detail from the MySQL database
app.get('/class/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM class WHERE id = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
} );


//Router to INSERT/POST a class's detail
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


//Router to UPDATE a class's detail
app.put('/class', (req, res) => {
    let classes = req.body;
    var sql = "SET @id = ?;SET @classname = ?;SET @course = ?; CALL classAddorEdit(@id,@classname,@course);";
    mysqlConnection.query(sql, [classes.id, classes.classname, classes.course], (err, rows, fields) => {
        if (!err)
            res.send('Class Details Updated Successfully');
        else
            console.log(err);
    })
});

//Router to DELETE a class's detail
app.delete('/class/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM class WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
             res.send('Class Record deleted successfully.');
        else
        console.log(err);
    })
});



//Creating GET Router to fetch all the class details from the MySQL Database
app.get('/lecture' , (req, res) => {
    mysqlConnection.query('SELECT * FROM lecture', (err, rows, fields) => {
            if (!err)
                if (rows.length > 0)
                    res.send(rows);
                else
                    res.send("No Record in the table");
             

            else
            console.log(err);
    })
} );


//Router to GET specific class detail from the MySQL database
//  search with id

app.get('/lecture/id/:id' , (req, res) => {
mysqlConnection.query('SELECT * FROM lecture WHERE id = ?',[req.params.id], (err, rows, fields) => {
if (!err)
res.send(rows);
else
console.log(err);
})
} );

//  search with classid

app.get('/lecture/classid/:classid' , (req, res) => {
    mysqlConnection.query('SELECT * FROM lecture WHERE class_id = ?',[req.params.classid], (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
    })
} );

//  search with time

app.get('/lecture/time/:time' , (req, res) => {
    mysqlConnection.query('SELECT * FROM lecture WHERE time = ?',[req.params.time], (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
    })
} );

//  search with day

app.get('/lecture/day/:day' , (req, res) => {
    mysqlConnection.query('SELECT * FROM lecture WHERE day = ?',[req.params.day], (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
    })
} );


//Router to INSERT/POST a lecture's detail
app.post('/lecture', (req, res) => {
let lectures = req.body;
var sql = "SET @id = ?;SET @class_id = ?;SET @time = ?;SET @day = ?; CALL lectureaddoredit(@id,@class_id,@time,@day);";
    mysqlConnection.query(sql, [lectures.id, lectures.class_id, lectures.time,lectures.day], (err, rows, fields) => {
    if (!err)
    rows.forEach(element => {
        if(element.constructor == Array)
        res.send('New Lecture ID : '+ element[0].id);
    });
    else
        console.log(err);
})
});


//Router to UPDATE a lecture's detail
app.put('/lecture', (req, res) => {
let classes = req.body;
var sql = "SET @id = ?;SET @class_id = ?;SET @time = ?;SET @day = ?; CALL lectureaddoredit(@id,@class_id,@time,@day);";
    mysqlConnection.query(sql, [lectures.id, lectures.class_id, lectures.time,lectures.day], (err, rows, fields) => {
    if (!err)
        res.send('lecture Details Updated Successfully');
    else
        console.log(err);
})
});

//Router to DELETE a lecture's detail
app.delete('/lecture/:id', (req, res) => {
mysqlConnection.query('DELETE FROM lecture WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Lecture Record deleted successfully.');
        else
        console.log(err);
    })
});


