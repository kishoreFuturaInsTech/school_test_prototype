import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddBoxIcon from "@mui/icons-material/AddBox";
import QuizIcon from "@mui/icons-material/Quiz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, Stack } from "@mui/material";
import { makeStyles, TablePagination } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import moment from "moment";
import AnsTableAdd from "./AnsTableAdd";
import AnsTableEdit from "./AnsTableEdit";
import "../Css/Content.css";

import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import AnsTableInfo from "./AnsTableInfo";
import InfoIcon from "@mui/icons-material/Info";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import DownloadIcon from "@mui/icons-material/Download";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

var initialValues = {
  userId: "",
  quizId: "",
  testTakenById: "",
  personUniqueCode: "",
};

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

function AnsTable() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [ansTableData, setansTableData] = useState(initialValues);
  const [record, setRecord] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [info, setInfo] = useState("");
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const onChange = (e) => {
    const { value, name } = e.target;

    setansTableData({ ...ansTableData, [name]: value });
  };

  const editClickOpen = (item) => {
    setRecord(item);
    setEditOpen(true);
  };

  const editClose = () => {
    setEditOpen(false);
  };

  const editChange = (e) => {
    let { value, name } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
    console.log(value, "value");
    console.log(name);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleInfoOpen = (value) => {
    setInfo(value);
    setInfoOpen(true);
  };
  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  //Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getData = () => {
    axios
      .get(
        `http://localhost:8090/answersheet/getall/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [quizData, setQuizData] = useState([]);
  console.log(data, "data");

  const getQuizData = () => {
    axios
      .get(
        `http://localhost:8090/quizHeader/getall/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setQuizData(resp.data);
      })
      .catch((err) => console.log(err));
  };
  const [userGroupData, setuserGroupData] = useState([]);

  const getUserGroupData = () => {
    axios
      .get(
        `http://localhost:8090/userGroup/getall/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setuserGroupData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [userData, setuserData] = useState([]);
  const getUserData = () => {
    axios
      .get(`http://localhost:8090/api/auth/user/getall/`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setuserData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [questionData, setquestionData] = useState([]);

  const getQuizQuestions = () => {
    axios
      .get(
        `http://localhost:8090/quizQuestion/getall/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setquestionData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [questionId, setquestionId] = useState([]);

  const handleQuestions = (e) => {
    const { value, name } = e.target;

    setquestionId(value);
  };

  useEffect(() => {
    getData();
    getUserData();
    getUserGroupData();
    getQuizData();
    getQuizQuestions();
    return () => {};
  }, []);

  const userId = sessionStorage.getItem("userId");

  const answerSheet = {
    userId: record.userId,
    quizId: record.quizId,
    testTakenById: record.testTakenById,
    personUniqueCode: record.personUniqueCode,
    createdBy: userId,
    modifiedBy: userId,
  };

  let body = {
    answerSheet: answerSheet,
    questionList: questionId,
  };

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8090/answersheet/addQuestionsToUsers/${userId}`,
        body,

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            // "Content-Type": "multipart/form-data",
            // "Content-Type": "application/x-www-form-urlencoded",
            // Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        handleClickClose();
        setansTableData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };
  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8090/answersheet/update/${record.id}/${userId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        editClose();
        getData();
        setNotify({
          isOpen: true,
          message: "Updated Successfully",
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8090/answersheet/softdelete/${id}/${sessionStorage.getItem(
          "userId"
        )}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        getData();
        setNotify({
          isOpen: true,
          message: "Deleted Successfully",
          type: "error",
        });
      });
  };

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8090/answersheet/search/${val}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
  };

  function downloadPdf(id) {
    axios({
      url: `http://localhost:8090/api/auth/generatePdf/${id}`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "demoone.pdf");
      link.click();
    });
  }

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b>Answer Sheet</b>{" "}
          </h2>
        </div>
        {access?.find((element) => element === "add-answerSheet") ? (
          <Button>
            <QuizIcon
              fontSize="large"
              className={classes.BackGround}
              onClick={() => handleClickOpen()}
            />
          </Button>
        ) : null}

        <TextField
          type="text"
          label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            globalsearch(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullwidth
        />

        <Paper className="paperStyle">
          <TableContainer sx={{ maxHeight: 440, maxWidth: 1200 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className="tableheader">
                <TableRow className="tablerow">
                  <TableCell className="tblhd" align="left">
                    Id{" "}
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    User
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Quiz
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Test Taken By
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Download Result
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Add Questions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 ? "classEven" : "classOdd"}
                    >
                      <TableCell align="left">{value?.id}</TableCell>
                      <TableCell align="left">
                        {value?.user?.username}
                      </TableCell>
                      <TableCell align="left">
                        {value?.qheader?.quizName}
                      </TableCell>
                      <TableCell align="left">
                        {value?.testTakenBy?.userGroupName}
                      </TableCell>
                      <TableCell>
                        <DownloadIcon
                          color="primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => downloadPdf(value.id)}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
                          {/* {access?.find(
                            (element) => element === "get-answerSheet"
                          ) ? (
                            <InfoIcon
                              color="success"
                              style={{ cursor: "pointer", marginRight: 10 }}
                              onClick={() => handleInfoOpen(value)}
                            />
                          ) : null} */}

                          {access?.find(
                            (element) => element === "update-answerSheet"
                          ) ? (
                            <QuestionMarkIcon
                              color="primary"
                              style={{ cursor: "pointer", marginRight: 10 }}
                              onClick={() => editClickOpen(value)}
                            />
                          ) : null}
                          {/* {access?.find(
                            (element) => element === "soft-delete-answerSheet"
                          ) ? (
                            <DeleteIcon
                              style={{ cursor: "pointer" }}
                              className="deleteClass"
                              color="error"
                              onClick={() => {
                                setConfirmDialog({
                                  isOpen: true,
                                  title: "Are you sure to delete this record?",
                                  subTitle: "You can't undo this operation",
                                  onConfirm: () => {
                                    handleDelete(value.id);
                                  },
                                });
                              }}
                            />
                          ) : null} */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <br />
            <TablePagination
              className="contentPagination"
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
          <br />
        </Paper>
      </div>
      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>

      <AnsTableAdd
        open={open}
        handleClose={handleClickClose}
        data={ansTableData}
        setData={setansTableData}
        quizData={quizData}
        userData={userData}
        handleQuestions={handleQuestions}
        questionData={questionData}
        questionId={questionId}
        userGroupData={userGroupData}
        onChange={onChange}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <AnsTableEdit
        open={editOpen}
        handleClose={editClose}
        setData={setRecord}
        userGroupData={userGroupData}
        handleQuestions={handleQuestions}
        questionData={questionData}
        questionId={questionId}
        userData={userData}
        quizData={quizData}
        data={record}
        onChange={editChange}
        handleFormSubmit={() => editFormSubmit()}
      />
      {/* <AnsTableInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
        quizData={quizData}
        userData={userData}
        userGroupData={userGroupData}
      /> */}
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default AnsTable;
