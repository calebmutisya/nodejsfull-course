const express = require('express');
const app = express()
const PORT = 3000

// Middleware-configure express to handle json
app.use(express.json())

// Define a route handler for the root URL ('/')
// This will send 'Hello World!' as a response when accessed
app.get('/', (req, res) => {
    res.send('<h1>Homepage</h1><input/>')
})

app.get('/dashboard', (req, res) => {
    res.send('<h1>Dashboard</h1>')
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
}) 


// Website Endpoints- send html

// Api Endpoints - send json

app.get('/api/user', (req, res) => {
    res.json({
        name: 'John Doe',
        age: 30
    })
})

//Add user
app.post('/api/user', (req, res) => {
    const newData = req.body
    console.log(newData)
    res.sendStatus(201)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})