import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

//Register New User- /auth/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    //encrypt password
    const hashedPassword = bcrypt.hashSync(password, 8)

    //save new user and hashed password to the new db
    try {
        const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)')
        const result = insertUser.run(username, hashedPassword)

        // now that user is registered i want to add their first todo for them 
        const defaultTodo = `Hello :) Add your first todo!`
        const insertTodo = db.prepare('INSERT INTO todos (user_id, task) VALUES (?, ?)')
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        //Create token
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

//Login User- /auth/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        //If we can not find user associated with that username
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)

        if (!user) {
            return res.sendStatus(404).send({message : "User not found"})
        }

        //If password does not match
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) {
            return res.sendStatus(401).send({message : "Invalid password"})
        }

        console.log(user)
        //Create token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })
        res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router