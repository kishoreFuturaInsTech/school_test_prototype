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
import { Button, Paper } from "@mui/material";
import { Modal } from "react-bootstrap";

import QuizQuestionAdd from "./QuizQuestionAdd";
import QuizQuestionEdit from "./QuizQuestionEdit";
import QuizQuestionInfo from "./QuizQuestionInfo";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import DraggableComponent from "../Service/DraggableComponent";
import ChoiceInfoCover from "./ChoiceInfoCover";
import PeopleIcon from "@mui/icons-material/People";

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

function QuizQuestion() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const classes = useStyles();
  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);
  const [editQuizQuestion, seteditQuizQuestion] = useState("");
  const [info, setinfo] = useState("");
  const [questionType, setquestionType] = useState("");
  const [questioncategory, setquestioncategory] = useState("");
  const [quizheader, setquizheader] = useState("");

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const [choice, setchoice] = useState("");

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

  const [picture, setpicture] = useState(" ");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setpicture(base64);
  };
  // const editImage = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertBase64(file);
  //   setRecord({ ...record, picture: base64 });
  //   console.log(e.target.files.name, "wow");
  // };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const editClickOpen = (item) => {
    seteditQuizQuestion(item);
    setEditOpen(true);
  };
  const editClickClose = () => {
    setEditOpen(false);
  };

  const infoClickOpen = (item) => {
    setInfoOpen(true);
    setinfo(item);
  };

  const infoClickClose = () => {
    setInfoOpen(false);
  };

  const [coverOpen, setCoverOpen] = useState(false);
  const [getCoverInfo, setGetCoverInfo] = useState("");

  const coverInfoOpen = (value, id) => {
    setCoverOpen(true);
    setGetCoverInfo(value);
    setchoice(id);
  };
  const coverInfoClose = () => {
    setCoverOpen(false);
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

  // get all Quiz Question
  const getData = () => {
    axios
      .get(`http://localhost:8090/quizQuestion/getall/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
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

  //Delete
  const handleDelete = (oldData) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .patch(
        `http://localhost:8090/quizQuestion/softdelete/${oldData}/${userId}`,
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
          message: resp.data,
          type: "error",
        });
      });
  };

  useEffect(() => {
    getData();
    getAllQuestionType();
    getAllQuestionCategory();
    getAllQuizHeader();
    return () => {};
  }, []);

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b> Quiz Question</b>{" "}
          </h2>
        </div>
        {access?.find((element) => element === "add-quizQuestion") ? (
          <Button>
            <AddBoxIcon
              fontSize="large"
              className={classes.BackGround}
              onClick={() => handleClickOpen()}
            />
          </Button>
        ) : null}

        <Paper className="paperStyle">
          <TableContainer sx={{ maxHeight: 440, maxWidth: 1200 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className="tableheader">
                <TableRow className="tablerow">
                  <TableCell className="tblhd" align="left">
                    Id
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Question
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Question Category
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Question Type
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
                      <TableCell align="left"> {value.question}</TableCell>
                      <TableCell align="left">
                        {value?.type.shortDescription}
                      </TableCell>
                      <TableCell align="left">
                        {value?.category.shortDescription}
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
                          <PeopleIcon
                            color="primary"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              coverInfoOpen(value?.choice, value.id)
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
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
          <Modal.Title> Quiz Question Info </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <QuizQuestionInfo
              open={infoOpen}
              infoClickClose={infoClickClose}
              info={info}
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
          <Modal.Title> Add Quiz Question </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <QuizQuestionAdd
              open={open}
              handleClickClose={handleClickClose}
              getdata={getData}
              picture={picture}
              uploadImage={uploadImage}
              questionTypes={questionType}
              questionCategories={questioncategory}
              quizheader={quizheader}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        dialogAs={DraggableComponent}
        show={editOpen}
        onHide={editClickClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title> Update Quiz Question </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <QuizQuestionEdit
              open={editOpen}
              handleClickClose={editClickClose}
              data={editQuizQuestion}
              getData={getData}
              setData={seteditQuizQuestion}
              notify={notify}
              setNotify={setNotify}
              questionTypes={questionType}
              questionCategories={questioncategory}
              quizheaders={quizheader}
            />
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        dialogAs={DraggableComponent}
        show={coverOpen}
        onHide={coverInfoClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title> Quiz Choice Info </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <ChoiceInfoCover
              open={coverInfoOpen}
              infoClickClose={coverInfoClose}
              cover={getCoverInfo}
              setcover={setGetCoverInfo}
              id1={choice}
              getall={getData}
            />
          </div>
        </Modal.Body>
      </Modal>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default QuizQuestion;
