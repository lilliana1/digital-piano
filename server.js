const express = require('express')
const app = express()

app.set('view engine', 'ejs')

// telling express where the files are
app.use(express.static('public'))

// index route
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(5000)