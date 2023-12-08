const express = require('express');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

//dotenv 패키지는 .env 파일을 읽어서 process.env로 만듦
dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan('dev')); //dev외에 배포 환경  combined
app.use('/', express.static(path.join(__dirname, 'public'))); //static 미들웨어는 정적인 파일 제공하는 라우터 역할

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.subscribe(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure :false,
    },
    name : 'session-cookie',
}));


app.get('/', (req, res) => {
    res.send("hi, express");
});


app.listen(app.get("port"), () => {
  console.log(app.get("port"), `번 포트에서 대기중`);
});