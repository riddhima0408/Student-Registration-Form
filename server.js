const express = require("express");

const app = express();

const PORT = 3000;

const path = require("path");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


let students = [];

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.post("/submit", (req, res) => {

    const {
        name,
        email,
        age,
        phone,
        gender,
        course,
        address
    } = req.body;

    

    if (
        !name ||
        !email ||
        !age ||
        !phone ||
        !gender ||
        !course ||
        !address
    ) {
        return res.send("<h2>All fields are required.</h2>");
    }

    if (Number(age) < 18) {
        return res.send("<h2>Age must be 18 or above.</h2>");
    }

    if (phone.length !== 10 || isNaN(phone)) {
        return res.send("<h2>Invalid Phone Number.</h2>");
    }

    

    students.push({
        name,
        email,
        age,
        phone,
        gender,
        course,
        address
    });

    res.send(`
    <html>
    <head>
    <title>Submission Successful</title>
    <style>
    body{
        font-family:Arial;
        background:#FFF4E6;
        text-align:center;
        padding-top:50px;
    }

    .box{
        width:450px;
        margin:auto;
        background:white;
        padding:30px;
        border-radius:15px;
        box-shadow:0 0 15px gray;
    }

    h2{
        color:green;
    }

    p{
        font-size:18px;
    }

    a{
        text-decoration:none;
        color:white;
        background:#6F4E37;
        padding:10px 20px;
        border-radius:8px;
    }

    </style>
    </head>

    <body>

    <div class="box">

    <h2>Registration Successful</h2>

    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Age:</b> ${age}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Gender:</b> ${gender}</p>
    <p><b>Course:</b> ${course}</p>
    <p><b>Address:</b> ${address}</p>

    <a href="/">Register Another Student</a>

    </div>

    </body>
    </html>
    `);

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});