const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const accountsRouter = require('./routers/accounts');
const usersRouter = require('./routers/users');
const { isAuth } = require('./utils')
const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
 
app.use(cors({
    origin: true,
    credentials: true
}));

 
// Here need to improve later
// app.use(isAuth)

app.use('/api/user', usersRouter);

app.use('/api/account', accountsRouter);


server.listen(8080, ()=>{
    console.log('server started on port 8080')
})
