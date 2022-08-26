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
import AddQuizChoice from "./AddQuizChoice";
import EditQuizChoice from "./EditQuizChoice";

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

export const ListQuizChoice = () => {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const [quizchoice, setquizchoice] = useState([]);
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

  // const access = JSON.parse(sessionStorage.getItem("specialaccess"))

  const getallquizchoices = () => {
    SchoolTestApi.getAllQuizChoices()
      .then((res) => {
        setquizchoice(res.data);
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
      ? getallquizchoices()
      : axios
          .get(`http://localhost:8090/quizchoice/search/${val}`)
          .then((res) => {
            setquizchoice(res.data);
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

  const deletequizchoice = (id) => {
    SchoolTestApi.deleteQuizChoice(id)
      .then((res) => {
        getallquizchoices();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clonequizchoice = (id) => {
    SchoolTestApi.cloneQuizChoice(id)
      .then((res) => {
        getallquizchoices();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    return () => {
      getallquizchoices();
    };
  }, []);

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b> Quiz Choice Details </b>{" "}
          </h2>
        </div>
        {access?.find((element) => element === "add-quizChoice") ? (
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
                    Question
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Choices
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Answer Key
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {quizchoice
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
                            {value.qstn.question}
                          </TableCell>
                          <TableCell>
                            <ol>
                              {value.choice1 === null || "" ? null : (
                                <li>{value.choice1}</li>
                              )}
                              {value.choice2 === null || "" ? null : (
                                <li>{value.choice2}</li>
                              )}
                              {value.choice3 === null || "" ? null : (
                                <li>{value.choice3}</li>
                              )}
                              {value.choice4 === null || "" ? null : (
                                <li>{value.choice4}</li>
                              )}
                              {value.choice5 === null || "" ? null : (
                                <li>{value.choice5}</li>
                              )}
                              {value.choice6 === null || "" ? null : (
                                <li>{value.choice6}</li>
                              )}
                              {value.choice7 === null || "" ? null : (
                                <li>{value.choice7}</li>
                              )}
                              {value.choice8 === null || "" ? null : (
                                <li>{value.choice8}</li>
                              )}
                              {value.choice9 === null || "" ? null : (
                                <li>{value.choice9}</li>
                              )}
                            </ol>
                          </TableCell>
                          <TableCell align="left">{value.ans}</TableCell>
                          <TableCell align="left">
                            <div className="TableClass">
                              {access?.find(
                                (element) => element === "update-quizChoice"
                              ) ? (
                                <EditIcon
                                  color="primary"
                                  style={{ cursor: "pointer", marginRight: 10 }}
                                  onClick={() => editClickOpen(value)}
                                />
                              ) : null}
                              {access?.find(
                                (element) =>
                                  element === "soft-delete-quizChoice"
                              ) ? (
                                <DeleteIcon
                                  style={{ cursor: "pointer" }}
                                  className="deleteClass"
                                  color="error"
                                  onClick={() => {
                                    deletequizchoice(value.id);
                                  }}
                                />
                              ) : null}
                              {access?.find(
                                (element) => element === "add-quizChoice"
                              ) ? (
                                <FileCopyIcon
                                  style={{ cursor: "pointer" }}
                                  color="primary"
                                  onClick={() => clonequizchoice(value.id)}
                                />
                              ) : null}
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
              count={quizchoice.length}
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
          <Modal.Title> Add Quiz Choice Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <AddQuizChoice
              close={addClose}
              getall={getallquizchoices}
              data={quizchoice}
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
          <Modal.Title> Edit Quiz Choice Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <EditQuizChoice
              open={editOpen}
              close={editClickClose}
              data={record}
              setData={setRecord}
              getall={getallquizchoices}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListQuizChoice;
