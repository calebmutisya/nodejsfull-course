import express from 'express'
import db from '../db.js'

const router = express.Router()

//Get all todos for a logged in user
router.get('/', async (req, res) => {

})

//Create a new todo
router.post('/', async (req, res) => {

})

//Update a todo
router.put('/:id', async (req, res) => {

})

//Delete a todo
router.delete('/:id', async (req, res) => {

})

export default router