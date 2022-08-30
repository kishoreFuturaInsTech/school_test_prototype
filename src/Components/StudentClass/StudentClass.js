import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { makeStyles, TablePagination } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import moment from "moment";
import StudentClassAdd from "./StudentClassAdd";
import StudentClassEdit from "./StudentClassEdit";
import "../Css/Content.css";

import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import StudentClassInfo from "./StudentClassInfo";
import InfoIcon from "@mui/icons-material/Info";

var initialValues = {
  userId: "",
  studentCode: "",
  studentClass: "",
  section: "",
  ranks: "",
  groupId: "",
  companyId: "",
};

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

function StudentClass() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [studentClassData, setStudentClassData] = useState(initialValues);
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

    setStudentClassData({ ...studentClassData, [name]: value });
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
    if (access.find((element) => element === "add-studentClass")) {
      setOpen(true);
    } else {
      window.alert("UNAUTHORIZED");
    }
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
        `http://localhost:8090/studentClass/getall/` +
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
  const [companyData, setcompanyData] = useState([]);
  const getCompanyData = () => {
    axios
      .get(
        `http://localhost:8090/company/getall/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setcompanyData(resp.data);
      })
      .catch((err) => console.log(err));
  };
  const [userData, setuserData] = useState([]);
  const getuserData = () => {
    axios
      .get(`http://localhost:8090/api/auth/user/getall/`)
      .then((resp) => {
        setuserData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [groupData, setgroupData] = useState([]);
  const getgroupData = () => {
    axios
      .get(`http://localhost:8090/group/getAll/`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setgroupData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    getgroupData();
    getCompanyData();
    getuserData();
    return () => {};
  }, []);

  const userId = sessionStorage.getItem("userId");

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8090/studentClass/add/${userId}`,
        {
          userId: studentClassData.userId,
          studentCode: studentClassData.studentCode,
          studentClass: studentClassData.studentClass,
          section: studentClassData.section,
          ranks: studentClassData.ranks,
          groupId: studentClassData.groupId,
          companyId: studentClassData.companyId,
          createdBy: userId,
          modifiedBy: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        handleClickClose();
        setStudentClassData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: "Created Successfully",
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };
  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8090/studentClass/update/${record.id}/${userId}`,
        {
          userId: record.userId,
          studentCode: record.studentCode,
          studentClass: record.studentClass,
          section: record.section,
          ranks: record.ranks,
          groupId: record.groupId,
          companyId: record.companyId,
          createdBy: userId,
          modifiedBy: userId,
          userId: record.userId,
        },
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
        `http://localhost:8090/studentClass/softdelete/${id}/${sessionStorage.getItem(
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

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b>Student Class</b>{" "}
          </h2>
        </div>
        <Button>
          <AddBoxIcon
            fontSize="large"
            className={classes.BackGround}
            onClick={handleClickOpen}
          />
        </Button>

        <Paper className="paperStyle">
          <TableContainer sx={{ maxHeight: 440, maxWidth: 1200 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className="tableheader">
                <TableRow className="tablerow">
                  <TableCell className="tblhd" align="left">
                    Id{" "}
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Student Code
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Class
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Section
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Rank
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
                      <TableCell align="left">{value.studentCode}</TableCell>
                      <TableCell align="left">{value.studentClass}</TableCell>
                      <TableCell align="left">{value.section}</TableCell>
                      <TableCell align="left">{value.ranks}</TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
                          <EditIcon
                            color="primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => editClickOpen(value)}
                          />
                          <DeleteIcon
                            color="error"
                            style={{ cursor: "pointer" }}
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
                          <InfoIcon onClick={() => handleInfoOpen(value)} />
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

      <StudentClassAdd
        open={open}
        handleClose={handleClickClose}
        data={studentClassData}
        companyData={companyData}
        groupData={groupData}
        userData={userData}
        onChange={onChange}
        setData={setStudentClassData}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <StudentClassEdit
        open={editOpen}
        handleClose={editClose}
        companyData={companyData}
        groupData={groupData}
        userData={userData}
        data={record}
        setData={setRecord}
        onChange={editChange}
        handleFormSubmit={() => editFormSubmit()}
      />
      <StudentClassInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
        userData={userData}
        companyData={companyData}
        groupData={groupData}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default StudentClass;
