const db = require('../database/db.js')

const Users = {
    get: () => {
        const sql = `SELECT * FROM users`
        return db.query(sql, [])
            .then(dbRes => {
                return dbRes.rows;
            })
    },
    getById: (user_id) => {
        const sql = `SELECT * FROM users WHERE id = $1`
        return db.query(sql, [user_id])
            .then(dbRes => {
                return dbRes.rows[0];
            })
    },
    create: (name, email, password_hash) => {
        const sql = `
            INSERT INTO users(name, email, password_hash) 
            VALUES($1, $2, $3)
            RETURNING *
            `
        return db.query(sql, [name, email, password_hash])
            .then(dbRes => {
                return dbRes.rows[0]
            })
    },
    getByEmail: (email) => {
        const sql = `
            SELECT * FROM users
            WHERE email = $1
            `
        return db.query(sql, [email])
            .then(dbRes => {
                console.log(dbRes.rows[0])
                if (dbRes.rows) {
                    return dbRes.rows[0]
                }
                return null
            })
    }
}

module.exports = Users