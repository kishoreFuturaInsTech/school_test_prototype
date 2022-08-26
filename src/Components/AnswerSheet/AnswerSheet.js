import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useCounter } from "../Contexts/StoreContext";
import Notification from "../Dialogs/Notification";

function AnswerSheet({ quizid, setIsAnswerSheet }) {
  const [questionList, setquestionList] = useState([]);

  const username = sessionStorage.getItem("username");
  const userId = sessionStorage.getItem("userId");

  const [answers, setanswers] = useState([]);

  let dto = {
    questionId: 0,
    answer: "",
  };

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const addAnswerToAnswerList = (answervalue, id) => {
    dto = {
      questionId: id,
      answer: answervalue,
    };
    if (answers.length === 0) {
      answers.push(dto);
    }
    if (answers.length > 0) {
      if (!answers.find((data) => data.questionId === id)) {
        answers.push(dto);
      } else {
        for (let index = 0; index < answers.length; index++) {
          if (answers[index].questionId === id) {
            answers[index].answer = answervalue;
          }
        }
      }
    }
  };

  const submitAnswerSheet = () => {
    //In the API call need to send the id and list of answers.

    axios
      .post(
        `http://localhost:8090/answersheet/addAnswersToAnswerSheet/${ansSheetId}`,
        answers,

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
        setIsAnswerSheet(false);
      });
  };

  const [ansSheetId, setansSheetId] = useState("");

  const getQuestionList = () => {
    axios
      .get(
        `http://localhost:8090/answersheet/getUserAndQuiz/${userId}/${quizid}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        setquestionList(resp.data.questionList);
        setansSheetId(resp.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuestionList();

    return () => {};
  }, []);

  const { student, teacher } = useCounter();

  const checkStudent = () => {
    if (student.id !== undefined && student.id !== null) {
      return (
        <>
          <br />
          <span style={{ display: "flex", justifyContent: "space-around" }}>
            <h4>
              <b>Name: </b>
              {username}
            </h4>
            <h4>
              <b>Class: </b>
              {student.studentClass}
            </h4>
            <h4>
              <b>Section: </b>
              {student.section}
            </h4>
            <h4>
              <b>School: </b>
              {student?.company?.companyLongName}
            </h4>
          </span>
        </>
      );
    } else if (teacher.id !== undefined && teacher.id !== null) {
      return (
        <>
          <br />
          <span style={{ display: "flex", justifyContent: "space-around" }}>
            <h4>
              <b>Name: </b>
              {username}
            </h4>
            <h4>
              <b>Teacher Code: </b>
              {teacher.teacherCode}
            </h4>
            <h4>
              <b>Specialisation: </b>
              {teacher.specialisation}
            </h4>
            <h4>
              <b>School: </b>
              {teacher?.company?.companyLongName}
            </h4>
          </span>
        </>
      );
    } else {
      return (
        <>
          <br />
          <span style={{ display: "flex", justifyContent: "space-around" }}>
            <h4>
              <b>Name: </b>
              {username}
            </h4>
            <h4>
              <b>User Group: </b>
              {sessionStorage.getItem("userGroup")}
            </h4>
          </span>
        </>
      );
    }
  };

  return (
    <>
      {checkStudent()}

      <div>
        <Paper
          elevation={8}
          style={{
            width: "70%",
            margin: "20px auto",
            height: "auto",
            backgroundColor: "#f5f5f5",
          }}
        >
          <h4
            style={{
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            {" "}
            <i> Choose the Correct Answer from the given options</i>
          </h4>
          <br />
          {questionList.map((val, index) => (
            <>
              <h5 key={val.id}>
                <ol>
                  <i>
                    {" "}
                    <li value={index + 1}>{val.question}</li>
                  </i>
                </ol>
              </h5>
              <Grid item xs={8} md={6} lg={4}>
                <FormControl>
                  <RadioGroup
                    row
                    style={{ marginLeft: "2rem" }}
                    onChange={(e) =>
                      addAnswerToAnswerList(e.target.value, val.id)
                    }
                  >
                    {val.choices?.map((val) => (
                      <FormControlLabel
                        value={val}
                        control={<Radio />}
                        label={val}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "1rem",
            }}
          >
            <Button
              style={{ margin: "0 0 1rem 1rem" }}
              color="error"
              variant="contained"
              onClick={() => setIsAnswerSheet(false)}
            >
              Back
            </Button>
            <Button
              onClick={() => submitAnswerSheet()}
              style={{ margin: "0 0 1rem 1rem" }}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </Paper>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </>
  );
}

export default AnswerSheet;
