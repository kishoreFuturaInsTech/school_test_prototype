import React, { useState, useEffect } from "react";
import "../../Css/Content.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { Modal } from "react-bootstrap";
import {
  Button,
  makeStyles,
  Paper,
  TableContainer,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import AddBoxIcon from "@mui/icons-material/AddBox";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddressTypeAdd from "./AddressTypeAdd";
import AddressTypeEdit from "./AddressTypeEdit";
import { useCounter } from "../../Contexts/StoreContext";

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

const AddressType = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editAddressType, setEditAddressType] = useState("");
  const [editOpen, SetEditOpen] = useState(false);

  const { username, myName } = useCounter();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const editClickOpen = (item) => {
    setEditAddressType(item);
    SetEditOpen(true);
  };
  const editClickClose = () => {
    SetEditOpen(false);
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

  // get all Address Type
  const getData = () => {
    axios
      .get(`http://localhost:8090/addressType/getAll`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (oldData) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this row",
      oldData
    );
    if (confirm) {
      axios
        .patch(
          `http://localhost:8090/addressType/softDelete/${oldData}`,
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
  // global Search

  const [search, setSearch] = useState("");
  const globalsearch = (val) => {
    val === ""
      ? getData()
      : axios
          .get(`http://localhost:8090/addressType/search/${val}`, {
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b>Address Type {username}</b>{" "}
          </h2>
        </div>
        <Button>
          <AddBoxIcon
            fontSize="large"
            className={classes.BackGround}
            onClick={handleClickOpen}
          />
        </Button>
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
          <TableContainer
            sx={{ maxHeight: 440, maxWidth: 1200, marginLeft: 5 }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className="tableheader">
                <TableRow className="tablerow">
                  <TableCell className="tblhd" align="left">
                    Id
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Short Description
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Long Description
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
                        {value.shortDescription}
                      </TableCell>
                      <TableCell align="left">
                        {value.longDescription}
                      </TableCell>
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
                            onClick={() => handleDelete(value.id)}
                          />
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
      <Modal show={open} onHide={handleClickClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title> Add Address Type </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <AddressTypeAdd
              open={open}
              handleClickClose={handleClickClose}
              getdata={getData}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={editOpen} onHide={editClickClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Update Address Type </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <AddressTypeEdit
              open={editOpen}
              handleClickClose={editClickClose}
              data={editAddressType}
              getData={getData}
              setData={setEditAddressType}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddressType;
