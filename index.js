require('dotenv').config({ path: './email.env' });

const express = require("express"); //import와 유사 
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "/BusanSilverWork-main/silverwork/build")));


app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/BusanSilverWork-main/silverwork/build",'index.html'));
  });

const PORT = process.env.PORT || 3000;

/*
app.get('/',function(req,res){
    res.sendFile(__dirname + "/BusanSilverWork-main/silverwork/src/pages/ListPage.js")
});

app.get('/resultPage',function(req,res){
    res.sendfFile(__dirname + "/BusanSilverWork-main/silverwork/src/pages/ResultsPage.js")
});

app.get('/resumePage',function(req,res){
    res.sendfFile(__dirname + "/BusanSilverWork-main/silverwork/src/pages/ResumePage.js")
});
*/

app.listen('3000',function(){
    console.log("3000 듣는 중!");
});

app.post('/api/results',function(req, res){
    const { formData, selectedJobCategories, selectedEmploymentTypes } = req.body;
    if (!formData || !selectedJobCategories || !selectedEmploymentTypes) {
        return res.status(400).send("필수 데이터가 누락되었습니다.")}
        
        res.send(200).send(("필수 데이터가 누락되었습니다."));
});

app.post('/api/send-email', function(req, res){
    const { handleSendEmail } = req.body;

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.EMAIL_USER ,     //여기 이메일 넣어주시면 됩니다. 
            password : process.env.EMAIL_PASS, //비밀번호 넣으시는데 진짜 비밀번호 말고, 웹에서 사용할 수 있는 비번 따로 만들어서 넣으시면 됩니다. 
        },
    });
    const mailOptions = {
        from : process.env.EMAIL_USER ,  //발신자 이메일 (임의이므로 바꾸시면 됩니다.) 
        to : '',  //수신자 이메일 
        subject : `${formData.name}님 이력서`,
        text :  `${formData}`
    };

    transporter.sendMail(mailOptions, function(error,info){
        if (error){
            return res.status(500).send("이메일 전송 실패");
        }
        else {
            console.log("이메일 전송 성공");
            return res.status(200).send("이메일 전송 성공");
        };
    });
});

