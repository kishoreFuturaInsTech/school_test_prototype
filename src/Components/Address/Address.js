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
import VisibilityIcon from "@mui/icons-material/Visibility";
import InfoIcon from "@mui/icons-material/Info";
import { Button, Paper } from "@mui/material";
import { Modal } from "react-bootstrap";

import AddressAdd from "./AddressAdd";
import AddressEdit from "./AddressEdit";
import AddrerssInfo from "./AddressInfo";
import Notification from "../Dialogs/Notification";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DraggableComponent from "../Service/DraggableComponent";

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

function Address() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));
  const userId = sessionStorage.getItem("userId");
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [addressType, setAddressType] = useState([]);
  const [info, setInfo] = useState("");
  const [editAddress, setEditAddress] = useState("");

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
    setEditAddress(item);
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
      .get(`http://localhost:8090/address/getall/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // get All address type
  const getAllAddressType = () => {
    axios
      .get(`http://localhost:8090/addressType/getAll`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setAddressType(resp.data);
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
        `http://localhost:8090/address/softdelete/${oldData}/${userId}`,
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

  useEffect(() => {
    getData();
    getAllAddressType();
    return () => {};
  }, []);

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8090/address/search/${val}`, {
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
            <b>Address</b>{" "}
          </h2>
        </div>
        {access?.find((element) => element === "add-address") ? (
          <Button>
            <AddBoxIcon
              fontSize="large"
              className={classes.BackGround}
              onClick={() => handleClickOpen()}
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
                    Id
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Address Type
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    District
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    State
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Country
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
                        {" "}
                        {value?.addressType.longDescription}
                      </TableCell>
                      <TableCell align="left">{value.district}</TableCell>
                      <TableCell align="left">{value.state}</TableCell>
                      <TableCell align="left">{value.country}</TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>
                          {access?.find(
                            (element) => element === "get-address"
                          ) ? (
                            <InfoIcon
                              color="success"
                              style={{ cursor: "pointer", marginRight: 10 }}
                              onClick={() => infoClickOpen(value)}
                            />
                          ) : null}

                          {access?.find(
                            (element) => element === "update-address"
                          ) ? (
                            <EditIcon
                              color="primary"
                              style={{ cursor: "pointer", marginRight: 10 }}
                              onClick={() => editClickOpen(value)}
                            />
                          ) : null}
                          {access?.find(
                            (element) => element === "soft-delete-address"
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
                              s
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
          <Modal.Title> Address Info </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <AddrerssInfo
              dialogAs={DraggableComponent}
              open={infoOpen}
              infoClickClose={infoClickClose}
              info={info}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={open} onHide={handleClickClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title> Add Address </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <AddressAdd
              open={open}
              dialogAs={DraggableComponent}
              handleClickClose={handleClickClose}
              getdata={getData}
              notify={notify}
              setNotify={setNotify}
              addressType={addressType}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={editOpen} onHide={editClickClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Update Address </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <AddressEdit
              dialogAs={DraggableComponent}
              open={editOpen}
              handleClickClose={editClickClose}
              data={editAddress}
              notify={notify}
              setNotify={setNotify}
              getData={getData}
              setData={setEditAddress}
              addressType={addressType}
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

export default Address;
