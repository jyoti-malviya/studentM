import StudentContext from "../../contexts/context";
import React, { useContext, useEffect, useState,useRef } from "react";
import "./Student_home_page.css"

export default function Student_home_page() {

  const studentContext = useContext(StudentContext);

  const {
    getStudentDetails,
    Student,
    SetStudentDetails,
    UpdateStudentDetails,
    DeleteStudentDetails,
    AddStudentDetails,
  } = studentContext;

  const [dataToSearch, searchData] = useState(null);
  const [searchedData, searchStudentDetails] = useState(null);
  const [studentToBeAdded, addStudent] = useState({});
  const [studentToBeUpdated, updateStudent] = useState('');
  const [updatedState, updateState] = useState(-1);
  const [averagePercentage, setAveragePercentage] = useState('');

  const searchStudenRef= useRef();


function onSearch(e){
      searchData(e.target.value);
  }

function searchStudent(){
     var searchValue = searchStudenRef.current.value;
     var searchIndex;
     if(dataToSearch=='name'){
      searchIndex=0;
      searchValue = searchValue.split(' ');
      const newdata = Student?.map((item,index)=>{
        return item[searchIndex]==searchValue[0] ? item :null
       })
       searchStudentDetails(newdata);
     }else if(dataToSearch=='standard'){
      searchIndex=3;
      const newdata = Student?.map((item,index)=>{
        return item[searchIndex]==searchValue ? item :null
       })
       searchStudentDetails(newdata);
     }
}

const onInputChange = (e) => {
  addStudent({ ...studentToBeAdded, [e.target.name]: e.target.value });
};

const onAddClick = () => {
  console.log("studentToBeAdded", studentToBeAdded);
  AddStudentDetails(studentToBeAdded);
};

function onSubmit(e) {
  e.preventDefault();
  updateStudent({ ...studentToBeUpdated, [e.target.name]: e.target.value });
  if(updatedState!=-1)
  UpdateStudentDetails(studentToBeUpdated, updatedState);
  updateState(-1);
}

function onEdit(index) {
  console.log(Student);
  updateStudent(Student[index]);
  updateState(index);
}

const onDelete = (index) => {
  DeleteStudentDetails(index);
};

function EditStudent() {

  function onInputChange(e) {
    updateStudent({ ...studentToBeUpdated, [e.target.name]: e.target.value });
  }
  console.log("studentToBeUpdated", studentToBeUpdated);

  return ( studentToBeUpdated && <tr>
      <td>
        <input
          type="text"
          name="name"
          id="name"
          value={studentToBeUpdated.name}
          onChange={onInputChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="age"
          id="age"
          value={studentToBeUpdated.age}
          onChange={onInputChange}
        />
      </td>
      <td>
        <input
          type="date"
          name="dob"
          id="dob"
          value={studentToBeUpdated.dob}
          onChange={onInputChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="standard"
          id="standard"
          value={studentToBeUpdated.standard}
          onChange={onInputChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="percentage"
          id="percentage"
          value={studentToBeUpdated.percentage}
          onChange={onInputChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="grade"
          id="grade"
          value={studentToBeUpdated.grade}
          onChange={onInputChange}
        />
      </td>
      <td>
        <button type="submit" onSubmit={onSubmit}>
          {" "}
          Update
        </button>
      </td>
    </tr>

  );
}

function getAveragePercentage(){
  var total = 0;
  var count = 0;
  Student.map((item, index) => {
    if(item[4] == 'undefined')
    {
      item[4] = 0;
    }
   total = parseInt(total) + parseInt(item[4]);
   count++;
  })

  var average = parseInt(total) / parseInt(count);
  setAveragePercentage(average);
}

useEffect(() => {
  getStudentDetails();
  console.log(Student);
}, []);


    //html
    return (
      <>
        <div style={{ display: "flex", maxWidth: "100%", flexWrap: "wrap" }}>
          <div className="search">
            <div>
              <h3 style={{ display: "inline" }}>Search Student</h3>
              <br></br>
              <select onChange={onSearch} name="search" id="search">
                <option value="name">By Name</option>
                <option value="standard">By Class</option>
              </select>
              {dataToSearch && (
                <div>
                  <input type="text" id="searchinput" ref={searchStudenRef} />
                  <button
                    type="button"
                    className="button"
                    onClick={() => searchStudent()}
                  >
                    Search Student
                  </button>
                </div>
              )}
            </div>
            <div>
              <table>
                {searchedData &&
                  searchedData.map((item, index) => {
                    return (
                      item != null && (
                        <tr>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                          <td>{item[2]}</td>
                          <td>{item[3]}</td>
                          <td>{item[4]}</td>
                        </tr>
                      )
                    );
                  })}
              </table>
            </div>
          </div>

          <div className="addstudent">
            <div>
            <h3>Add Student : </h3>
            </div>
            <br></br>
            <div>
            <form action="" method="post" className="card" />
             Name:{" "}
            <input
              type="text"
              name="name"
              id=""
              value={studentToBeAdded.name}
              onChange={onInputChange}
            />
            Age:{" "}
            <input
              type="number"
              name="age"
              id=""
              value={studentToBeAdded.age}
              onChange={onInputChange}
            />
            DOB{" "}
            <input
              type="date"
              name="dob"
              id=""
              value={studentToBeAdded.dob}
              onChange={onInputChange}
            />
            Class{" "}
            <input
              type="number"
              name="standard"
              id=""
              value={studentToBeAdded.standard}
              onChange={onInputChange}
            />
            Percentage(%){" "}
            <input
              type="number"
              name="percentage"
              id=""
              value={studentToBeAdded.percentage}
              onChange={onInputChange}
            />
            Grade{" "}
            <input
              type="text"
              name="grade"
              id=""
              value={studentToBeAdded.grade}
              onChange={onInputChange}
            />
            <button
              className="button"
              onClick={() => {
                return onAddClick();
              }}
            >
              {" "}
              AddStudent{" "}
            </button>
            </div>
           
          </div>

          <div className="studentDetails">
          <h1> Student details </h1>
          <br/>
          <form onSubmit={onSubmit} action="">
            <table>
              <tr>
                <td>Name</td>
                <td>Age</td>
                <td>DOB</td>
                <td>Class</td>
                <td>Percentage</td>
                <td>Grade</td>
              </tr>

              {Student &&
                Student.map((item, index) => {
                  return updatedState === index ? (
                    <EditStudent/>
                  ) : (
                    <tr>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>{item[4]}</td>
                      <td>{item[5]}</td>
                      <td>
                        <button
                          className="edit"
                          onClick={() => onEdit(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete"
                          onClick={() =>{ return onDelete(index)}}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </form>
        </div>

        <div>
        <button
              className="button"
              onClick={() => {
                return getAveragePercentage();
              }}
            >
              {" "}
              GetAveragePercentage{" "}
            </button>
            <li>
    <h1>Average Percentage</h1>
    <h3>{averagePercentage}</h3>
    </li>
        </div>

        </div>
        <br />
      </>
    );
}