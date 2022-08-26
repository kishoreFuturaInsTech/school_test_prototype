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
import { Avatar, Button, Stack } from "@mui/material";
import { makeStyles, TablePagination } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import moment from "moment";
import CompanyAdd from "./CompanyAdd";
import CompanyEdit from "./CompanyEdit";
import "../Css/Content.css";

import ConfirmDialog from "../Dialogs/ConfirmDialog";
import Notification from "../Dialogs/Notification";
import CompanyInfo from "./CompanyInfo";
import InfoIcon from "@mui/icons-material/Info";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

var initialValues = {
  companyCode: "",
  companyName: "",
  companyShortName: "",
  companyLongName: "",
  addressId: "",
  gst: "",
  cin: "",
  cinDate: "",
  tin: "",
  pan: "",
  companyLogo: "",
  createdBy: "",
  modifiedBy: "",
};

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#B31942",
    color: "white",
  },
}));

function Company() {
  const access = JSON.parse(sessionStorage.getItem("specialaccess"));

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [companyData, setcompanyData] = useState(initialValues);
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

    setcompanyData({ ...companyData, [name]: value });
  };

  const onChangeCinDate = (date) => {
    setcompanyData({ ...companyData, cinDate: date });
  };
  const editChangeCinDate = (date) => {
    setcompanyData({ ...record, cinDate: date });
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
    setOpen(true);
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
        `http://localhost:8090/company/getall/` +
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

  const [addressData, setaddressData] = useState([]);
  const getAddressData = () => {
    axios
      .get(
        `http://localhost:8090/address/getall/` +
          sessionStorage.getItem("userId"),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setaddressData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    getAddressData();
    return () => {};
  }, []);

  const userId = sessionStorage.getItem("userId");

  const [companyLogo, setCompanyLogo] = useState(" ");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setCompanyLogo(base64);
  };
  const editImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setRecord({ ...record, companyLogo: base64 });
    console.log(e.target.files.name, "wow");
  };

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

  const handleFormSubmit = () => {
    axios
      .post(
        `http://localhost:8090/company/add/${userId}`,
        {
          companyCode: companyData.companyCode,
          companyName: companyData.companyName,
          companyShortName: companyData.companyShortName,
          companyLongName: companyData.companyLongName,
          addressId: companyData.addressId,
          gst: companyData.gst,
          cin: companyData.cin,
          cinDate: moment(companyData.cinDate).format("MM-DD-YYYY"),
          tin: companyData.tin,
          pan: companyData.pan,
          companyLogo,
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
        setcompanyData(initialValues);
        getData();
        setNotify({
          isOpen: true,
          message: resp.data,
          type: "success",
        });
      })
      .catch((err) => console.log(err));
  };
  const editFormSubmit = () => {
    axios
      .patch(
        `http://localhost:8090/company/update/${record.id}/${userId}`,
        {
          companyCode: record.companyCode,
          companyName: record.companyName,
          companyShortName: record.companyShortName,
          companyLongName: record.companyLongName,
          addressId: record.addressId,
          gst: record.gst,
          cin: record.cin,
          cinDate: moment(record.cinDate).format("MM-DD-YYYY"),
          tin: record.tin,
          pan: record.pan,
          companyLogo: record.companyLogo,
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
        `http://localhost:8090/company/softdelete/${id}/${sessionStorage.getItem(
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
          .get(`http://localhost:8090/company/search/${val}`, {
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
            <b>Company</b>{" "}
          </h2>
        </div>
        {access?.find((element) => element === "add-company") ? (
          <Button>
            <AddBoxIcon
              fontSize="large"
              className={classes.BackGround}
              onClick={() => handleClickOpen()}
            />
          </Button>
        ) : null}

        <TextField
          type="text"
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
                    Company Code
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Company Name
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Company Short Name
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Company Long Name
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    GST
                  </TableCell>
                  <TableCell className="tblhd" align="left">
                    Company Logo
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
                      <TableCell align="left">{value.companyCode}</TableCell>
                      <TableCell align="left">{value.companyName}</TableCell>
                      <TableCell align="left">
                        {value.companyShortName}
                      </TableCell>
                      <TableCell align="left">
                        {value.companyLongName}
                      </TableCell>
                      <TableCell align="left">{value.gst}</TableCell>
                      <TableCell align="left">
                        <Stack direction="row" spacing={2}>
                          <Avatar>
                            {" "}
                            <img
                              style={{ height: "40px", width: "40px" }}
                              src={value.companyLogo}
                            />
                          </Avatar>
                        </Stack>
                      </TableCell>
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
          Copyright © www.futurainstech.com @{moment().format("YYYY")}
        </h6>
      </div>

      <CompanyAdd
        open={open}
        handleClose={handleClickClose}
        data={companyData}
        addressData={addressData}
        onChange={onChange}
        onChangeCinDate={onChangeCinDate}
        uploadImage={uploadImage}
        handleFormSubmit={() => handleFormSubmit()}
      />
      <CompanyEdit
        open={editOpen}
        handleClose={editClose}
        addressData={addressData}
        data={record}
        uploadImage={editImage}
        onChange={editChange}
        onChangeCinDate={editChangeCinDate}
        handleFormSubmit={() => editFormSubmit()}
      />
      <CompanyInfo
        open={infoOpen}
        handleClose={handleInfoClose}
        data={info}
        addressData={addressData}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default Company;
