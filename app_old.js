const express = require('express');
// console.log(express);
const app = express();
// console.log(app);
app.set('port', process.env.PORT || 3000);
const path=require('path');

// console.log("process.env.PORT", process.env.PORT);
// console.log("현재 경로 ", __dirname);
// console.log("조인된 경로 ", path.join(__dirname, "/index.html"));

//미들웨어 : 요청과 응답의 중간(middle)에 위치해서 라우터와 에러 핸들러 또한 미들웨어
//미들웨어는 요청과 응답을 조작하여 기능을 추가하기도 하고, 나쁜 요청을 걸러내기도 함

//미들웨어가 실행되는 경우
// app.use(미들웨어) : 모든 요청에서 미들웨어 실행
// app.use('/abc', 미들웨어) : /abc로 요청시 미들웨어 실행
// app.post('/abc', 미들웨어) : /abc로 시작하는 POST 요청시 미들웨어 실행

//미들웨어 여러개 장착 가능
// app.get('/', 미들웨어1, 미들웨어2)  /요청시 여러 미들웨어 연결, 다만 next를 호출해야 다음 미들웨어로
//넘어갈 수 있음


app.use((req, res, next) => {
    console.log(`모든 요청에 대해 다  실행`);
    next();
});

app.get('/', (req, res, next) => {
    // res.send("hi, express");
    res.sendFile(path.join(__dirname, '/index.html'));
    console.log(`GET / 요청시에만 실행`);
    // next();
}, (req, res) => { 
    throw new Error(`요청 파일이 없음`)
});


//에러 처리 미들웨어는 매개변수가 err, req, res, next로 네 개, 모든 매개변수를 사용하지 않더라도 매개변수가 반드시
// 네 개여야 함, 에러 처리 미들웨어는 특별한 경우가 아니면 가장 아래에 위치
app.use((err, req, res, next) => { 
    console.log(`에러 :  ${err}`);    
    res.status(404).send(err.message)
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), `번 포트에서 대기중`);
});