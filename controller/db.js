const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'library_management',
    connectionLimit: 10,  // Number of connections in the pool
});


module.exports = {
    query: function (sql, values) {
        return new Promise((resolve, reject) => {
            pool.query(sql, values, (err, results) => {
                if (err) {
                    console.log('query error')
                    return reject(err);
                }
                resolve(results);
            });
        });
    },
    // Optionally, export the pool itself for transactions or other purposes
    getConnection: function () {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log('connection error')

                    return reject(err);
                }
                resolve(connection);
            });
        });
    }
}