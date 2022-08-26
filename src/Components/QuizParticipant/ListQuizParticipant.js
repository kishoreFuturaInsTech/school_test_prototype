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
import AddQuizParticipant from "./AddQuizParticipant";
import EditQuizParticipant from "./EditQuizParticipant";

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

export const ListQuizParticipant = () => {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const [quizparticipant, setquizparticipant] = useState([]);
  const [record, setRecord] = useState([]);
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

  const getallquizparticipants = () => {
    SchoolTestApi.getAllQuizParticipants()
      .then((res) => {
        setquizparticipant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
      ? getallquizparticipants()
      : axios
          .get(`http://localhost:8090/quizparticipant/search/${val}`)
          .then((res) => {
            setquizparticipant(res.data);
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

  const deletequizparticipant = (id) => {
    SchoolTestApi.deleteQuizParticipant(id)
      .then((res) => {
        getallquizparticipants();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clonequizparticipant = (id) => {
    SchoolTestApi.cloneQuizPartcipant(id)
      .then((res) => {
        getallquizparticipants();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    return () => {
      getallquizparticipants();
    };
  }, []);

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b> Quiz Participant Details </b>{" "}
          </h2>
        </div>
        {access?.find((element) => element === "add-quizParticipant") ? (
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
                    Participating In
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Participant
                  </TableCell>

                  <TableCell className="tblhd" align="left">
                    No of Attempts Made
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {quizparticipant
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((value, index) => (
                    <>
                      {value.vaidFlag === -1 ? null : (
                        <TableRow
                          key={index}
                          className={index % 2 ? "classEven" : "classOdd"}
                        >
                          <TableCell align="left">{value.id}</TableCell>
                          <TableCell align="left">
                            {value.quiz.quizName}
                          </TableCell>
                          <TableCell align="left">
                            {value.participant.username}
                          </TableCell>

                          <TableCell align="left">
                            {value.noOfAttempts}
                          </TableCell>
                          <TableCell align="left">
                            <div className="TableClass">
                              {access?.find(
                                (element) =>
                                  element === "update-quizParticipant"
                              ) ? (
                                <EditIcon
                                  color="primary"
                                  style={{ cursor: "pointer", marginRight: 10 }}
                                  onClick={() => editClickOpen(value)}
                                />
                              ) : null}
                              {access?.find(
                                (element) =>
                                  element === "soft-delete-quizParticipant"
                              ) ? (
                                <DeleteIcon
                                  style={{ cursor: "pointer" }}
                                  className="deleteClass"
                                  color="error"
                                  onClick={() =>
                                    deletequizparticipant(value.id)
                                  }
                                />
                              ) : null}
                              {/* {access?.find(
                                (element) => element === "add-quizParticipant"
                              ) ? (
                                <FileCopyIcon
                                  style={{ cursor: "pointer" }}
                                  color="primary"
                                  onClick={() => clonequizparticipant(value.id)}
                                />
                              ) : null} */}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
              </TableBody>
            </Table>
            <br />
            <TablePagination
              className="contentPagination"
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              count={quizparticipant.length}
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
          <Modal.Title> Add Quiz Participant Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <AddQuizParticipant
              close={addClose}
              getall={getallquizparticipants}
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
          <Modal.Title> Edit Quiz Participant Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <EditQuizParticipant
              open={editOpen}
              close={editClickClose}
              data={record}
              setData={setRecord}
              getall={getallquizparticipants}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListQuizParticipant;
