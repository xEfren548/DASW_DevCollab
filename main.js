const express = require('express');
const path = require('path');
const port = process.env.PORT || 3001;

const authRouter = require('./routes/auth-route.js')
//const taskRouter = require('./routes/tasks-route.js');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

//app.use('/api/tasks', taskRouter)
//app.use('/api/login', authRouter)

app.listen(port, ()=> console.log("Running on port "+ port))