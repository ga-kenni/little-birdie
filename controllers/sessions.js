const express = require('express');
const bcrypt = require('bcrypt')

const Users = require('../models/users.js');

const isValidPassword = (plainTextPassword, passwordHash) => {
    return bcrypt.compareSync(plainTextPassword, passwordHash)
}

const router = express.Router();

// Logging a user in
router.post('/', (req, res) => {
    const { email, password } = req.body
    Users
        .getByEmail(email)
        .then(user => {
            console.log(user)
            if (user && isValidPassword(password, user.password_hash)) {
                req.session.userId = user.id // store user id in session
                res.json({ message: 'logged in successfully' })
            } else {
                res.status(400).json({ message: 'invalid email or password' })
            }
        })
})

// Logging a user out
router.delete('/', (req, res) => {
    req.session.destroy()
    res.json({ message: 'logged out successfully' })
})

// Am I logged in
router.get('/', (req, res) => {
    const userId = req.session.userId
    if (!userId) {
        res.json({ loggedIn: false})
        return
    }
    Users.getById(userId).then(user => {
        res.json({ loggedIn: true, userId: userId, name: user.name, email: user.email})
    })
})

module.exports = router