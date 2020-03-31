const express = require('express')
const mongoose = require('mongoose')
const Song = require('./models/song.js')
const app = express()

mongoose.connect('mongodb://localhost.songRecorder', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.json())
// telling express where the files are
app.use(express.static('public'))

// index route
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/songs', (req, res) => {
    req.body.songNotes
})

app.listen(5000)