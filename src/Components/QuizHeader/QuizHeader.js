import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/Content.css";
import "../Css/ContentAdd.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles, TablePagination } from "@material-ui/core";
import moment from "moment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyTwoTone";
import { Button, Paper } from "@mui/material";
import { Modal } from "react-bootstrap";

import QuizHeaderAdd from "./QuizHeaderAdd";
import QuizHeaderEdit from "./QuizHeaderEdit";
import QuizHeaderInfo from "./QuizHeaderInfo";
import QuizQuestionsInfo from "./QuizQuestionDetails";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import DraggableComponent from "../Service/DraggableComponent";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddUsers from "./AddUsers";
import QuizIcon from "@mui/icons-material/Quiz";

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

function QuizHeader() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [editQuizHeader, setEditQuizHeader] = useState("");
  const [info, setInfo] = useState("");
  const [company, setcompany] = useState("");

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
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

  const handleClickOpen = () => {
    if (access.find((element) => element === "add-quizHeader")) {
      setOpen(true);
    } else {
      window.alert("UNAUTHORIZED");
    }
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const editClickOpen = (item) => {
    setEditQuizHeader(item);
    setEditOpen(true);
  };
  const editClickClose = () => {
    setEditOpen(false);
  };

  const [userOpen, setuserOpen] = useState(false);

  const [userRecord, setUserRecord] = useState("");

  const userClickOpen = (item) => {
    setUserRecord(item);
    setuserOpen(true);
  };
  const userClickClose = () => {
    setuserOpen(false);
  };

  const infoClickOpen = (item) => {
    setInfoOpen(true);
    setInfo(item);
  };

  const infoClickClose = () => {
    setInfoOpen(false);
  };

  console.log(userRecord, "ur");

  // Quiz Header Question Details

  const [questionOpen, setquestionOpen] = useState(false);
  const [questions, setquestions] = useState([]);

  const [headerId, setHeaderId] = useState("");

  const questionInfoOpen = (value, id) => {
    setquestionOpen(true);
    setHeaderId(id);
    setquestions(value);
  };
  console.log("header id : ", headerId);
  const questionInfoClose = () => {
    setquestionOpen(false);
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

  // get all Quiz Header
  const getData = () => {
    axios
      .get(`http://localhost:8090/quizHeader/getall/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
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

  const [userIds, setuserIds] = useState([]);

  const handleUsers = (e) => {
    const { value, name } = e.target;

    setuserIds(value);
  };

  // get all Company
  const getCompanyDetails = () => {
    axios
      .get(`http://localhost:8090/company/getall/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setcompany(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // global Search

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8090/quizHeader/search/${val}`, {
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

  // Clone Quiz Header
  const cloneQuizHeader = (oldData) => {
    const confirm = window.confirm(
      "Are you sure, you want to clone this Quiz Header",
      oldData
    );
    if (confirm) {
      axios
        .post(
          `http://localhost:8090/quizHeader/clone/${oldData}/${userId}`,
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
        });
    }
  };

  //Delete
  const handleDelete = (oldData) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    axios
      .patch(
        `http://localhost:8090/quizHeader/softdelete/${oldData}/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        if (resp.data === "Cannot be Deleted") {
          getData();
          setNotify({
            isOpen: true,
            message: resp.data,
            type: "error",
          });
        } else {
          getData();
          setNotify({
            isOpen: true,
            message: resp.data,
            type: "error",
          });
        }
      });
  };

  useEffect(() => {
    getData();
    getUserData();
    getCompanyDetails();
    return () => {};
  }, []);

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b> Quiz Header</b>{" "}
          </h2>
        </div>
        {/* <Button>
          <AddBoxIcon
            fontSize="large"
            className={classes.BackGround}
            onClick={handleClickOpen}
          />
        </Button> */}

        {access?.find((element) => element === "add-quizHeader") ? (
          <Button>
            <AddBoxIcon
              fontSize="large"
              className={classes.BackGround}
              onClick={() => handleClickOpen()}
            />
          </Button>
        ) : null}

        <input
          type="search"
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            globalsearch(e.target.value);
          }}
        />

        <Paper className="paperStyle">
          <TableContainer sx={{ maxHeight: 440, maxWidth: 1200 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className="tableheader">
                <TableRow className="tablerow">
                  <TableCell className="tblhd" align="left">
                    Id
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Quiz
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Start Date
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    End Date
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Add Users
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Info
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Actions
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
                      <TableCell align="left">{value.id}</TableCell>
                      <TableCell align="left"> {value.quizName}</TableCell>
                      <TableCell align="left">{value.startDate}</TableCell>
                      <TableCell align="left">{value.endDate}</TableCell>
                      <TableCell align="left">
                        <GroupAddIcon
                          color="primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => userClickOpen(value)}
                        />
                      </TableCell>

                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
                          {access?.find(
                            (element) => element === "get-quizHeader"
                          ) ? (
                            <InfoIcon
                              color="success"
                              style={{ cursor: "pointer", marginRight: 10 }}
                              onClick={() => infoClickOpen(value)}
                            />
                          ) : null}
                          {access?.find(
                            (element) => element === "get-quizHeader"
                          ) ? (
                            <QuizIcon
                              color="primary"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                questionInfoOpen(value.questions, value.id)
                              }
                            />
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
                          {/* {access?.find(
                            (element) => element === "add-quizHeader"
                          ) ? (
                            <FileCopyTwoToneIcon
                              style={{ cursor: "pointer" }}
                              color="primary"
                              onClick={() => cloneQuizHeader(value.id)}
                            />
                          ) : null} */}
                          {access?.find(
                            (element) => element === "update-quizHeader"
                          ) ? (
                            <EditIcon
                              color="primary"
                              style={{ cursor: "pointer", marginRight: 10 }}
                              onClick={() => editClickOpen(value)}
                            />
                          ) : null}
                          {access?.find(
                            (element) => element === "soft-delete-quizHeader"
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
                          ) : null}
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

      <Modal
        dialogAs={DraggableComponent}
        show={infoOpen}
        onHide={infoClickClose}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title> Quiz Header Info </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <QuizHeaderInfo
              open={infoOpen}
              infoClickClose={infoClickClose}
              info={info}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        dialogAs={DraggableComponent}
        show={questionOpen}
        onHide={questionInfoClose}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title> Quiz Header Question Details </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <QuizQuestionsInfo
              open={questionInfoOpen}
              infoClickClose={questionInfoClose}
              questions={questions}
              setquestions={setquestions}
              headerId={headerId}
              getAll={getData}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        dialogAs={DraggableComponent}
        show={open}
        onHide={handleClickClose}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title> Add Quiz Header </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <QuizHeaderAdd
              open={open}
              userId={userIds}
              userData={userData}
              handleUsers={handleUsers}
              handleClickClose={handleClickClose}
              getdata={getData}
              notify={notify}
              setNotify={setNotify}
              company={company}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={editOpen} onHide={editClickClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Update Quiz Header </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <QuizHeaderEdit
              open={editOpen}
              handleClickClose={editClickClose}
              data={editQuizHeader}
              notify={notify}
              setNotify={setNotify}
              getData={getData}
              setData={setEditQuizHeader}
              company={company}
            />
          </div>
        </Modal.Body>
      </Modal>
      <AddUsers
        open={userOpen}
        handleClickClose={userClickClose}
        data={userRecord}
        company={company}
        userData={userData}
        setData={setUserRecord}
        notify={notify}
        setNotify={setNotify}
        getData={getData}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default QuizHeader;
