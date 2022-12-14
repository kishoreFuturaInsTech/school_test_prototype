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
import UserGroupAdd from "./UserGroupAdd";
import UserGroupEdit from "./UserGroupEdit";
import "../Css/Content.css";

import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import UserGroupInfo from "./UserGroupInfo";
import InfoIcon from "@mui/icons-material/Info";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

var initialValues = {
  companyId: "",
  userGroupName: "",
};

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

function UserGroup() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [userGroupData, setUserGroupData] = useState(initialValues);
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

    setUserGroupData({ ...userGroupData, [name]: value });
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
    if (access.find((element) => element === "add-userGroup")) {
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
        `http://localhost:8090/userGroup/getall/` +
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
  const getcompanyData = () => {
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

  useEffect(() => {
    getData();
    getcompanyData();
    return () => {};
  }, []);

  const userId = sessionStorage.getItem("userId");

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8090/userGroup/add/${userId}`,
        {
          companyId: userGroupData.companyId,
          userGroupName: userGroupData.userGroupName,
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
        setUserGroupData(initialValues);
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
        `http://localhost:8090/userGroup/update/${record.id}/${userId}`,
        {
          companyId: record.companyId,
          userGroupName: record.userGroupName,
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
        `http://localhost:8090/userGroup/softdelete/${id}/${sessionStorage.getItem(
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
          .get(`http://localhost:8090/userGroup/search/${val}`, {
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

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b>User Group</b>{" "}
          </h2>
        </div>
        {access?.find((element) => element === "add-company") ? (
          <Button>
            <AddBoxIcon
              fontSize="large"
              className={classes.BackGround}
              onClick={handleClickOpen}
            />
          </Button>
        ) : null}

        <TextField
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
                    Company
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    UserGroup Name
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
                      <TableCell align="left">
                        {value.company?.companyName}
                      </TableCell>
                      <TableCell align="left">{value.userGroupName}</TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
                          {access?.find(
                            (element) => element === "get-company"
                          ) ? (
                            <InfoIcon
                              color="success"
                              style={{ cursor: "pointer", marginRight: 10 }}
                              onClick={() => handleInfoOpen(value)}
                            />
                          ) : null}

                          {access?.find(
                            (element) => element === "update-company"
                          ) ? (
                            <EditIcon
                              color="primary"
                              style={{ cursor: "pointer", marginRight: 10 }}
                              onClick={() => editClickOpen(value)}
                            />
                          ) : null}
                          {access?.find(
                            (element) => element === "soft-delete-company"
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
          Copyright ?? www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>

      <UserGroupAdd
        open={open}
        handleClose={handleClickClose}
        data={userGroupData}
        companyData={companyData}
        onChange={onChange}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <UserGroupEdit
        open={editOpen}
        handleClose={editClose}
        companyData={companyData}
        data={record}
        onChange={editChange}
        handleFormSubmit={() => editFormSubmit()}
      />
      <UserGroupInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
        companyData={companyData}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default UserGroup;
