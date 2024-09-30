
const bodyParser = require("body-parser");
const dotENV = require("dotenv");
const appJS = require("../app");

const createUser = async (request, response) => {
    try {
        console.log('req.body', request)
        const { name, dob, emailId, address, category, role, grade, createdBy, updatedBy, bookLimit, currentBookLimit } = request.body;
        await appJS.connection.promise().query(
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

module.exports ={ createUser}