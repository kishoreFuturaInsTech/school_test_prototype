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

import TeacherAdd from "./TeacherAdd";
import TeacherEdit from "./TeacherEdit";
import TeacherInfo from "./TeacherInfo";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

function Teacher() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [company, setCompany] = useState([]);
  const [info, setInfo] = useState("");
  const [editTeacher, setEditTeacher] = useState("");

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
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const editClickOpen = (item) => {
    setEditTeacher(item);
    setEditOpen(true);
  };
  const editClickClose = () => {
    setEditOpen(false);
  };

  const infoClickOpen = (item) => {
    setInfoOpen(true);
    setInfo(item);
  };

  const infoClickClose = () => {
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

  // get all Address
  const getData = () => {
    axios
      .get(`http://localhost:8090/teacher/getall/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
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
        setCompany(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // get all User
  const getUserDetails = () => {
    axios
      .get(`http://localhost:8090/api/auth/user/getall`)
      .then((resp) => {
        setUser(resp.data);
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
      .patch(`http://localhost:8090/teacher/softdelete/${oldData}`, {}, {})
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

  useEffect(() => {
    getData();
    getCompanyDetails();
    getUserDetails();
    return () => {};
  }, []);

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b> Teacher Details</b>{" "}
          </h2>
        </div>
        {access?.find((element) => element === "add-teacher") ? (
          <Button>
            <AddBoxIcon
              fontSize="large"
              className={classes.BackGround}
              onClick={() => handleClickOpen()}
            />
          </Button>
        ) : null}

        {/* <input
          type="search"
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            globalsearch(e.target.value);
          }}
        /> */}

        <Paper className="paperStyle">
          <TableContainer sx={{ maxHeight: 440, maxWidth: 1200 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className="tableheader">
                <TableRow className="tablerow">
                  <TableCell className="tblhd" align="left">
                    Id
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Teacher Code
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    teacher Name
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Graduation
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Specilisation
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
                      <TableCell align="left"> {value.teacherCode}</TableCell>
                      <TableCell align="left">{value.teacherName}</TableCell>
                      <TableCell align="left">{value.graduation}</TableCell>
                      <TableCell align="left">{value.specialisation}</TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
                          {access?.find(
                            (element) => element === "get-teacher"
                          ) ? (
                            <InfoIcon
                              color="success"
                              style={{ cursor: "pointer", marginRight: 10 }}
                              onClick={() => infoClickOpen(value)}
                            />
                          ) : null}

                          {access?.find(
                            (element) => element === "update-teacher"
                          ) ? (
                            <EditIcon
                              color="primary"
                              style={{ cursor: "pointer", marginRight: 10 }}
                              onClick={() => editClickOpen(value)}
                            />
                          ) : null}
                          {access?.find(
                            (element) => element === "soft-delete-teacher"
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

      <Modal show={infoOpen} onHide={infoClickClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title> Teacher Info </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <TeacherInfo
              open={infoOpen}
              infoClickClose={infoClickClose}
              info={info}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={open} onHide={handleClickClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title> Add Teacher </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <TeacherAdd
              open={open}
              handleClickClose={handleClickClose}
              getdata={getData}
              notify={notify}
              company={company}
              user={user}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={editOpen} onHide={editClickClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Update Teacher Details </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <TeacherEdit
              open={editOpen}
              handleClickClose={editClickClose}
              data={editTeacher}
              getData={getData}
              getdata={getData}
              notify={notify}
              setData={setEditTeacher}
              company={company}
              user={user}
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

export default Teacher;
