const express = require('express')
const app = express()
const tasksRoutes = require('./routes/tasks')
const errorRoutes = require('./routes/error')

app.use(express.json())
app.use(express.urlencoded({extended: false }))
app.use('/api' , tasksRoutes)
app.use(errorRoutes)

app.listen(3000)

