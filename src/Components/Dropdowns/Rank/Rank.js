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

import EditRank from "./EditRank";
import AddRank from "./AddRank";

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));
function Rank() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editRank, setEditRank] = useState("");
  const [editOpen, SetEditOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const editClickOpen = (item) => {
    setEditRank(item);
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

  // get allRank
  const getData = () => {
    axios
      .get(`http://localhost:8090/ranks/getAll`, {
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
          `http://localhost:8090/rank/softDelete/${oldData}`,
          {},
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

  const [sectionData, setsectionData] = useState("");

  const getSection = () => {
    axios
      .get(`http://localhost:8090/section/getAll`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setsectionData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    getSection();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="classTitle">
          <h2>
            {" "}
            <b>Rank Details</b>{" "}
          </h2>
        </div>
        <Button>
          <AddBoxIcon
            fontSize="large"
            className={classes.BackGround}
            onClick={handleClickOpen}
          />
        </Button>
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
                    Rank Holder
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
                      <TableCell align="left">{value.rankHolder}</TableCell>

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
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>
      <Modal show={open} onHide={handleClickClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title> Add Rank Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <AddRank
              open={open}
              handleClickClose={handleClickClose}
              sectionData={sectionData}
              getdata={getData}
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={editOpen} onHide={editClickClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title> UpdateRank Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <EditRank
              open={editOpen}
              handleClickClose={editClickClose}
              data={editRank}
              getData={getData}
              sectionData={sectionData}
              setData={setEditRank}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Rank;
