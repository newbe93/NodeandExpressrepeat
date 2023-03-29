// ===============================  express 없는 node  ==============================================================
// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log("INCOMING REQUEST");
//   console.log(req.method, req.url);

//   if (req.method === "POST") {
//     let body = "";
//     req.on("end", () => {
//       const userName = body.split("=")[1];
//       res.end("<h1>" + userName + "</h1>");
//     });
//     req.on("data", (chunk) => {
//       body = body + chunk;
//     });
//   } else {
//     res.setHeader("Content-Type", "text/html"); // 브라우저가 html 으로 해석하는 것을 원치 않는다면?
//     res.end(
//       '<form method="POST"><input type="text" name="username"/><button type="submit">CREATE USER</button></form>'
//     );
//   }
// });

// server.listen(5000);
// =============================================================================================

// 서드 파티 라이브러리를 추가하려면 일단 관리형 프로젝트(Manage project)로 변환해야한다. => npm init

// ===============================  express 사용 node  ==============================================================
const express = require("express");
// 85 . npm install body-parser --save/
// bodyparser 는 express 앱에서 들어오는 req.body를 파싱할 수 잇는 기성(ready-to-use) 미들웨어를 제공한다.
const bodyParser = require("body-parser");
const app = express();

//85
// json 을 파싱할때는 .json
// app.use(bodyParser.json())
// 일반양식데이터를 얻을때는 url~~
app.use(bodyParser.urlencoded({ extended: false }));

// 수신 POST 요청에만 트리거되는 미들웨어를 등록할 수 있는 app.post
// GET과 POST 요청은 최소 두 개의 인수를 필요로 한다.
// 하나는 경로를 식별하는 문자열, 그리고 미들웨어
app.post("/user", (req, res, next) => {
  res.send("<h1>User :" + req.body.username + "</h1>");
});

app.listen(5000);

// express의 핵심 철학 : 모든 요청을 여러 개의 미들웨어 함수를 통해 수신한다.
// 미들웨어함수는 결국 요청을 통해 데이터를 가져오거나 요청을 처리하고 응답을 처리하여 반환하는 일반 함수이다.
// 수신 요청으로 호출할 수 있는 여러 개의 함수가 있고 모든 함수는 수신 요청이나 반환할 응답에 대해 정해진 작업을 수행한다.
// 응답은 요청당 하나씩만 전송할 수 있다.

// 미들웨어는 app에서 use메서드를 호출하여 등록한다.
// use메서드는 가장 간단한 형태의 미들웨어이며 함수를 인수로 갖는다.
// use안에 들어오는 함수는 3개의 인자를 갖는데 수신요청을 뜻하는 req 객체, 응답요청 res, 그리고 미들웨어에서 응답을 보내지 않고
// 다음 미들웨어로 요청을 전달하고 싶을 때 호출하는 next
app.use((req, res, next) => {
  console.log("MIDDLEWARE");
  next();
});
// 85. 모든 수신요청에 중에 경로가 /로 시작하는 요청에 대해 미들웨어를 실행
// app.use('/')
// 85. 수신요청이 GET이고 경로가 /를 대상으로 하는 요청에 대해 미들웨어를 실행하겠다.
app.get("/", (req, res, next) => {
  res.send(
    '<form action="/user" method="POST"><input type="text" name="username"/><button type="submit">CREATE USER</button></form>'
  );
});
