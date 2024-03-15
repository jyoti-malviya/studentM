import StudentContext from "./context";
import React, { useState } from "react";

const backend_url = "http://localhost:5000/";

export default function Student_state(props) {
  const [Student, SetStudentDetails] = useState(null);

  // get student data from server.
  const getStudentDetails = async () => {
    try {
      const response = await fetch(`${backend_url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.ok) {
        const data = await response.json();
        SetStudentDetails(data.studentData);
      } else {
        console.error("Failed to fetch student details");
      }
    } catch (error) {
      console.error("Error while getting data:", error);
    }
  };

  // add student data.
  const AddStudentDetails = async (data) => {
    try {
        console.log(data);
      const response = await fetch(`${backend_url}addstudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        SetStudentDetails(data.studentData);
      } else {
        console.error("Failed to add student details");
      }
    } catch (error) {
      console.error("Error while adding data::", error);
    }
  };

  // update student data.
  const UpdateStudentDetails = async (data, index) => {
    try {
      const response = await fetch(`${backend_url}updatestudent`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          index,
          name: data.name,
          age: data.age,
          dob: data.dob,
          standard: data.standard,
          percentage: data.percentage,
          grade: data.grade
        }),
      });

      if (response.ok) {
        const data = await response.json();
        SetStudentDetails(data.studentData);
      } else {
        console.error("Failed to update student details");
      }
    } catch (error) {
      console.error("Error while updating data:", error);
    }
  };

  // delete student data.
  const DeleteStudentDetails = async (index) => {
    try {
      const response = await fetch(`${backend_url}deletestudent/${index}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.ok) {
        const data = await response.json();
        SetStudentDetails(data.studentData);
      } else {
        console.error("Failed to delete student details");
      }
    } catch (error) {
      console.error("Error while deleting data:", error);
    }
  };

  

  return (
    <StudentContext.Provider
      value={{
        getStudentDetails,
        Student,
        SetStudentDetails,
        UpdateStudentDetails,
        DeleteStudentDetails,
        AddStudentDetails,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
}
