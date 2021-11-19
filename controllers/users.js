const express = require('express');
const bcrypt = require('bcrypt')

const Users = require('../models/users.js');
const Entries = require('../models/entries');

const router = express.Router();

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

router.get('/:id', (req, res) => {
    Users.getById(req.params.id).then(users => {
        res.json(users);
    })
})

router.post('/', (req, res) => {
    const { name, email, password } = req.body
    if (name === undefined || name === '') {
        res.status(400).json({message: 'name is required'})
        return
    }
    if (email === undefined || email === '') {
        res.status(400).json({message: 'email is required'})
        return
    }
    if (password === undefined || password === '') {
        res.status(400).json({message: 'password is required'})
        return
    }
    const password_hash = generateHash(password)
    Users
        .create(name, email, password_hash)
        .then(() => {
            res.status(200).json({message: "success"})
        })
})

router.get('/:user_id/entries', (req, res) => {
    Entries.getAllForUser(req.params.user_id).then(entries => {
        res.json(entries);
    })
})

router.get('/:user_id/entries/:id', (req, res) => {
    Entries.get(req.params.id).then(entries => {
        res.json(entries);
    })
})

module.exports = router