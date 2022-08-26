import React, { useState, useEffect } from "react";
import {
  Button,
  makeStyles,
  Paper,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SchoolTestApi from "../Service/SchoolTestApi";
import "../Css/Content.css";
import "../Css/ContentAdd.css";
import DraggableComponent from "../Service/DraggableComponent";
import AddQuizAnswer from "./AddQuizAnswer";
import EditQuizAnswer from "./EditQuizAnswer";

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

export const ListQuizAnswer = () => {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const [quizanswer, setquizanswer] = useState([]);
  const [record, setRecord] = useState("");
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //getallquizanswers

  const getallquizanswers = () => {
    axios
      .get(
        `http://localhost:8090/quizanswer/getall/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setquizanswer(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [add, setAdd] = useState(false);
  const addOpen = () => {
    setAdd(true);
  };
  const addClose = () => {
    setAdd(false);
  };

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getallquizanswers()
      : axios
          .get(`http://localhost:8090/quizanswer/search/${val}`)
          .then((res) => {
            setquizanswer(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
  };

  const [editOpen, setEditOpen] = useState(false);

  const editClickOpen = (item) => {
    setRecord(item);
    setEditOpen(true);
  };

  const editClickClose = () => {
    setEditOpen(false);
  };

  const deletequizanswer = (id) => {
    SchoolTestApi.deleteQuizAnswer(id)
      .then((res) => {
        getallquizanswers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clonequizanswer = (id) => {
    SchoolTestApi.cloneQuizAnswer(id)
      .then((res) => {
        getallquizanswers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getallquizanswers();
    return () => {};
  }, []);

  console.log(quizanswer, "answer");

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b> Quiz Answer Details </b>{" "}
          </h2>
        </div>
        {access?.find((element) => element === "add-quizAnswer") ? (
          <Button>
            <AddBoxIcon
              fontSize="large"
              className={classes.BackGround}
              onClick={() => addOpen()}
            />
          </Button>
        ) : null}
        <OutlinedInput
          className="outlinedInput"
          type="text"
          label="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            globalsearch(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
          fullwidth
        />
        <Paper className="paperStyle">
          <TableContainer sx={{ maxHeight: 440, maxWidth: 1200 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className="tableheader">
                <TableRow className="tablerow">
                  <TableCell className="tblhd" align="left">
                    ID
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Question Id
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Answer
                  </TableCell>
                  {/* <TableCell className="tblhd" align="left">
                    Choice Id
                  </TableCell> */}
                  <TableCell className="tblhd" align="left">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {quizanswer
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value, index) => (
                    <>
                      <TableRow
                        key={index}
                        className={index % 2 ? "classEven" : "classOdd"}
                      >
                        <TableCell align="left">{value.id}</TableCell>
                        <TableCell align="left">
                          {value.question.question}
                        </TableCell>
                        <TableCell align="left">{value.answer}</TableCell>
                        {/* <TableCell align="left">{value.choiceId}</TableCell> */}
                        <TableCell align="left">
                          <div className="TableClass">
                            {access?.find(
                              (element) => element === "update-quizAnswer"
                            ) ? (
                              <EditIcon
                                color="primary"
                                style={{ cursor: "pointer", marginRight: 10 }}
                                onClick={() => editClickOpen(value)}
                              />
                            ) : null}
                            {access?.find(
                              (element) => element === "soft-delete-quizAnswer"
                            ) ? (
                              <DeleteIcon
                                style={{ cursor: "pointer" }}
                                className="deleteClass"
                                color="error"
                                onClick={() => {
                                  deletequizanswer(value.id);
                                }}
                              />
                            ) : null}
                            {access?.find(
                              (element) => element === "add-quizAnswer"
                            ) ? (
                              <FileCopyIcon
                                style={{ cursor: "pointer" }}
                                color="primary"
                                onClick={() => clonequizanswer(value.id)}
                              />
                            ) : null}
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
            <br />
            <TablePagination
              className="contentPagination"
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={quizanswer.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
      </div>
      <div className="footerdescription">
        <h6 className="footerContent">
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>
      <Modal
        dialogAs={DraggableComponent}
        show={add}
        onHide={addClose}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title> Add Quiz Answer Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <AddQuizAnswer close={addClose} getall={getallquizanswers} />
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
          <Modal.Title> Edit Quiz Answer Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <EditQuizAnswer
              open={editOpen}
              close={editClickClose}
              data={record}
              setData={setRecord}
              getall={getallquizanswers}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListQuizAnswer;
