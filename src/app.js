const express = require('express')

const app = express();

app.use('/hello', (req, res) => {
   res.send("Hellow from express js")
})


app.use('/test', (req, res) => {
    res.send('Test from express server')
})

app.listen('8888', () => {
    console.log('Server is listening on port 8888...')
})