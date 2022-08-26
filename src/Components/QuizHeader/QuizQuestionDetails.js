import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { makeStyles, TablePagination } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import InfoIcon from "@mui/icons-material/Info";

import QuizQuestionAdd from "../QuizQuestion/QuizQuestionAdd";
import QuizQuestionInfo from "../QuizQuestion/QuizQuestionInfo";
import AbstractModalHeader from "react-bootstrap/esm/AbstractModalHeader";

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#d50000",
    color: "white",
  },
}));

function QuizQuestionDetails({ getAll, questions, headerId, setquestions }) {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const classes = useStyles();
  const userId = sessionStorage.getItem("userId");

  const [questionModel, setQuestionModel] = useState(false);

  const coverAddOpen = () => {
    setQuestionModel(true);
  };

  const questionAddClose = () => {
    setQuestionModel(false);
    getQuizQuestions();
    getAll();
  };

  const [questionTypes, setquestionType] = useState("");
  const [questioncategories, setquestioncategory] = useState("");
  const [quizheader, setquizheader] = useState("");

  //Info Open
  const [infoDetails, setInfoDetails] = useState("");
  const [info, setInfo] = useState(false);
  const infoOpen = (value) => {
    setInfoDetails(value);
    setInfo(true);
  };
  const infoClose = () => {
    setInfo(false);
  };

  // get all Quiz Question
  const getQuizQuestions = () => {
    axios
      .get(`http://localhost:8090/quizQuestion/get/${headerId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setquestions(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // get all Quiz Question
  const getAllQuizHeader = () => {
    axios
      .get(`http://localhost:8090/quizHeader/getall/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setquizheader(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // get all Quiz Question Type
  const getAllQuestionType = () => {
    axios
      .get(`http://localhost:8090/questionType/getAll`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setquestionType(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // get all Quiz Question category
  const getAllQuestionCategory = () => {
    axios
      .get(`http://localhost:8090/questionCategory/getAll`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setquestioncategory(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllQuestionType();
    getAllQuestionCategory();
    getAllQuizHeader();
    return () => {};
  }, []);

  console.log(questions, "questions");

  return (
    <div>
      {access?.find((element) => element === "add-quizQuestion") ? (
        <Button>
          <AddBoxIcon
            fontSize="large"
            className={classes.BackGround}
            onClick={() => coverAddOpen()}
          />
        </Button>
      ) : null}

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="tableheader">
          <TableRow className="tablerow">
            <TableCell className="tblhd" align="left">
              Quiz Question Id
            </TableCell>
            <TableCell className="tblhd" align="left">
              Quiz Question
            </TableCell>
            <TableCell className="tblhd" align="left">
              Question Type
            </TableCell>
            <TableCell className="tblhd" align="left">
              Question Category
            </TableCell>
            <TableCell className="tblhd" align="left">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions?.map((val) => (
            <>
              {val.validFlag === 1 ? (
                <TableRow>
                  <TableCell> {val.id}</TableCell>
                  <TableCell> {val.question} </TableCell>
                  <TableCell> {val.type?.shortDescription} </TableCell>
                  <TableCell> {val.category?.shortDescription} </TableCell>
                  <TableCell align="left">
                    <div className="TableClass">
                      <InfoIcon
                        color="primary"
                        style={{ cursor: "pointer", marginRight: 10 }}
                        onClick={() => infoOpen(val)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ) : null}
            </>
          ))}
        </TableBody>
      </Table>

      <Modal show={questionModel} onHide={questionAddClose} centered size="lg">
        <Modal.Header closeButton>
          {" "}
          <Modal.Title> Quiz Question Add </Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <QuizQuestionAdd
              open1={questionModel}
              headerId={headerId}
              close1={questionAddClose}
              setquizheader={setquizheader}
              questionTypes={questionTypes}
              questionCategories={questioncategories}
              quizheader={quizheader}
            />
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={info} onHide={infoClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Quiz Question Info </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <QuizQuestionInfo info={infoDetails} />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default QuizQuestionDetails;
