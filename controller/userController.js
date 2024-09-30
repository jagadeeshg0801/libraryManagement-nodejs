
const bodyParser = require("body-parser");
const dotENV = require("dotenv"); 
const mysql = require("mysql2");
const db = require("./db");  //TYPE2

// connecting Database - TYPE1
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'library_management'
//   }); 
const createUser = async (request, response) => {
    try {
        console.log('req.body', request.body)
        const { name, dob, emailId, address, category, role, grade, createdBy, updatedBy, bookLimit, currentBookLimit } = request.body;
        //- TYPE1
        // await  appJS.connection().promise().query(
        //     `INSERT INTO user (name, dob, emailId, address, category, role, grade, createdBy, updatedBy, bookLimit, currentBookLimit) 
        //     VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?)`,
        //     [name, dob, emailId, address, category, role, grade, createdBy, updatedBy, bookLimit, currentBookLimit]
        // );

        // TYPE2
        db.query(
                `INSERT INTO user (name, dob, emailId, address, category, role, grade, createdBy, updatedBy, bookLimit, currentBookLimit) 
                VALUES (?, ?,?, ?,?, ?,?, ?,?, ?,?)`,
                [name, dob, emailId, address, category, role, grade, createdBy, updatedBy, bookLimit, currentBookLimit]
            );
    
        response.status(201).json({ 'status': "successfully user created" })
    } catch (error) {
        console.log('error', error);
        response.status(500).json({
            message: err,
        });
    }
}


const createBook = (request, response)=>{
    try{
        console.log('req.body', request)
        const { title, author, yearofmade, totalcount, avlblcount, publisher, subject, createdBy, updatedBy } = request.body;
        db.query(
            `INSERT INTO books (title, author, yearofmade, totalcount, avlblcount, publisher, subject, createdBy, updatedBy ) 
            VALUES (?, ?,?, ?,?, ?,?, ?,?)`,
            [title, author, yearofmade, totalcount, avlblcount, publisher, subject, createdBy, updatedBy ]
        );

    response.status(201).json({ 'status': "successfully book created" })
    }catch(error){
        console.log('error', error);
        response.status(500).json({
            message: err,
        });
    }

}

module.exports ={ createUser, createBook}