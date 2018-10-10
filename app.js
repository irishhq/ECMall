const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user.js');

var app = express();
app.listen(3000);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

app.use('/user', userRouter);//访问路由/user/login