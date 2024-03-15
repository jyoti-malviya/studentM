const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// get all student details
app.get("/", (request, response) => {
    try
    {
        var studentRecords = fs.readFileSync("./student.txt", "utf-8");
        var studentData = studentRecords.split("\n");
        studentData = studentData.map((Element) => {
          return Element.split(",");
        });
        response.json({ studentData });
    }
    catch
    {
        console.error("Internal server error while getting data");
    }
  });

// get student details by standard
app.get("/getstudentbyclass/:id", (request, response) => {
    try
    {
        const standard = request.params.id;
        var splittedData = getSplittedData();
        for (let index = 0; index < splittedData.length; index++) {
          if (splittedData[index][2] != standard) {
            splittedData.splice(index, 1);
            index--;
          }
        }
        const responseData = splittedData.join("\n").split("\n");
        response.send({ responseData });
    }
    catch
    {
        console.error("Internal server error while getting data by class");
    }
  });

// get student details by name
app.get("/getstudentbyname/:id", (request, response) => {
    try
    {
        var studentName = request.params.id;
        studentName= studentName.split(' ');
        var splittedData = getSplittedData();
        for (let index = 0; index < splittedData.length; index++) {
          if (splittedData[index][0]!=studentName[0] && !splittedData[index][1]!=studentName[1]) {
            splittedData.splice(index, 1);
            index--;
          }
        }
        const responseData = splittedData.join("\n").split("\n");
        response.send({ responseData });
    }
    catch
    {
        console.error("Internal server error while getting data by name");
    }
  });

// add student details.
app.post("/addstudent", (request, response) => {
    try
    {
        const { name, age, dob, standard, percentage, grade } = request.body.data;
      
        var dataToAdd;
        var studentData = fs.readFileSync("./student.txt", "utf-8");
        if (studentData.length > 0)
            dataToAdd = `\n${name},${age},${dob},${standard},${percentage},${grade}`;
        else {
            dataToAdd = `${name},${age},${dob},${standard},${percentage},${grade}\n`;
        }
        console.log(dataToAdd);
        fs.appendFileSync("./student.txt", dataToAdd);

        var responseData = getSplittedData();
        response.json({ responseData });
    }
    catch(error)
    {
        console.error("Internal server error while adding data, ", error);
    }
  });
  
  
// update student details
app.put("/updatestudent", (request, response) => {
    try
    {
        const studentData = fs.readFileSync("./student.txt", "utf-8").split("\n");
        const { index, name, age, dob, standard, percentage, grade } = request.body;
        const updatedStudentData = `${name},${age},${dob},${standard},${percentage},${grade}`;
        studentData.splice(index, 1, updatedStudentData);
        const studentDetails = studentData.join("\n");
        fs.writeFileSync("./student.txt", studentDetails, "utf-8");
        var responseData = studentDetails.split("\n");
        responseData = responseData.map((Element) => {
          return Element.split(",");
        });
      
        response.json({ responseData });
    }
    catch
    {
        console.error("Internal server error while updating data");
    }
  });
  

// delete student details
app.delete("/deletestudent/:id", (request, response) => {
    try
    {
        const name = request.params.id;
        const data = fs.readFileSync("./student.txt", "utf-8");
        const splittedData = data.split("\n");
      
        splittedData.splice(name, 1);
        const studentDetails = splittedData.join("\n");
        fs.writeFileSync("./student.txt", studentDetails);
      
        var reponseData = splittedData;
        reponseData = reponseData.map((Element) => {
          return Element.split(",");
        });
        response.json({ reponseData });
    }
    catch(error)
    {
        console.error("Internal server error while deleting data: ", error);
    }
  });

// return splitted data
function getSplittedData()
  {
    const studentData = fs.readFileSync("./student.txt", "utf-8");
    var splittedData = studentData.split("\n");

    return splittedData;
  }
  
// post listen.
app.listen(PORT, (err) => {
    if (err) console.log(err);
    else {
      console.log("Server Listening at port: 5000");
    }
  });

