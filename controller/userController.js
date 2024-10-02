
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


const createBook = (request, response) => {
    try {
        console.log('req.body', request)
        const { title, author, yearofmade, totalcount, avlblcount, publisher, subject, createdBy, updatedBy } = request.body;
        db.query(
            `INSERT INTO books (title, author, yearofmade, totalcount, avlblcount, publisher, subject, createdBy, updatedBy ) 
            VALUES (?, ?,?, ?,?, ?,?, ?,?)`,
            [title, author, yearofmade, totalcount, avlblcount, publisher, subject, createdBy, updatedBy]
        );

        response.status(201).json({ 'status': "successfully book created" })
    } catch (error) {
        console.log('error', error);
        response.status(500).json({
            message: err,
        });
    }

}

const getUsersList = async (request, response) => {
    try {
        db.query(
            `SELECT * FROM user`,
            (error, results) => {
                if (error) {
                    console.log('error', error);
                    return response.status(500).json({
                        message: 'Error retrieving user data',
                    });
                }
                if (results) {
                    console.log('result...', results)
                    response.status(200).json(results);
                }
            }
        );
    } catch (error) {
        console.log('error', error);
        response.status(500).json({
            message: 'Server error',
        });
    }
}

//Get user details by Id

const getUserDetails = async (req, res) => {
    try {
        console.log("req",req.params)
        const id = req.params.id;
        console.log('id',id)

        db.query(
            `Select * from library_management.user where id = ${id}`, (error, results)=>{
                if(error){
                   return res.status(500).json({"Error": "something went wrong...!"})
                }
                if(results){
                    return   res.status(201).json(results.length>0? {"data": results}: {"data": "No Matches found!"});
                }
            }
        )

    }
    catch (e) {
        return res.status(500).json({"error": "something went wrong...!"})
    }

}

const updateUserDetails = (req, res)=>{
    try{
        const { name, dob, emailId, address, category, role, grade, updatedBy, bookLimit, currentBookLimit ,id} = req.body;
        db.query(
            `update user SET name=?, dob=?, emailId=?, address=?, category=?, role=?, grade=?, updatedBy=?, bookLimit=?, currentBookLimit=? WHERE id=?) 
            `,
            [name, dob, emailId, address, category, role, grade, updatedBy, bookLimit, currentBookLimit,id]
        );

        res.status(201).json({ 'status': "successfully user Details updated..!" })

    }catch(e){

    }
}

module.exports = { createUser, createBook, getUsersList ,getUserDetails, updateUserDetails}