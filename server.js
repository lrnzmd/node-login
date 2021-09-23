const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async(req, res) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
        //res.json(user)
    } catch (err) {
        res.status(500).send()
    }

})

app.post('/users/login', async (req, res) => {
    const user = await users.find(user => user.name === req.body.name)
    if (user === null) {
        return res.status(400).send('Cannnot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Success')
        } else{
            res.send('Try again')
        }
    } catch (error) {
        res.status(500).send()
    }
})

app.listen(3000)