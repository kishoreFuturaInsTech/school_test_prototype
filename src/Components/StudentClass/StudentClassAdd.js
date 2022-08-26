import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../Css/ContentAdd.css";

export default function CompanyAdd({
  open,
  handleClose,
  data,
  companyData,
  groupData,
  onChange,
  userData,
  handleFormSubmit,
  setData,
}) {
  let {
    userId,
    studentCode,
    studentClass,
    section,
    ranks,
    groupId,
    companyId,
  } = data;
  const [studentClassData, setstudentClassData] = useState([]);
  const onChangeCompanyId = (value) => {
    setData({ ...data, companyId: value });
    console.log("company Id ", companyId);
    axios
      .get(`http://localhost:8090/studentGrade/getAllByCompanyId/${value}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setstudentClassData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [sectionData, setsectionData] = useState([]);
  const onChangeClass = (value) => {
    setData({ ...data, studentClass: value });
    console.log("Student Id ", studentClass);
    axios
      .get(`http://localhost:8090/section/getAllByStudentGrade/${value}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setsectionData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [rankData, setrankData] = useState([]);
  const onChangeSection = (value) => {
    setData({ ...data, section: value });
    console.log("Section Data ", section);
    axios
      .get(`http://localhost:8090/ranks/getAllBySection/${value}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setrankData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Student Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="User Id"
                    className="formtext"
                    id="userId"
                    value={userId}
                    placeholder="User Id"
                    name="userId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {userData.map((val) => (
                      <MenuItem value={val.id} key={val.id}>
                        {val.id}-{val.username}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid> */}
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Student Code"
                    className="formtext"
                    id="studentCode"
                    value={studentCode}
                    placeholder="Student Code"
                    name="studentCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Company"
                    className="formtext"
                    id="companyId"
                    value={companyId}
                    placeholder="Company"
                    name="companyId"
                    onChange={(e) => onChangeCompanyId(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {companyData.map((val) => (
                      <MenuItem value={val.id}>
                        {val.id}-{val.companyName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Student Class"
                    className="formtext"
                    id="studentClass"
                    value={studentClass}
                    placeholder="Student Class"
                    name="studentClass"
                    onChange={(e) => onChangeClass(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {studentClassData.map((val) => (
                      <MenuItem value={val.shortDescription}>
                        {val.shortDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Section"
                    className="formtext"
                    id="section"
                    value={section}
                    placeholder="Section"
                    name="section"
                    onChange={(e) => onChangeSection(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {sectionData.map((val) => (
                      <MenuItem value={val.shortDescription}>
                        {val.shortDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Rank"
                    className="formtext"
                    id="ranks"
                    value={ranks}
                    placeholder="Rank"
                    name="ranks"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {rankData.map((val) => (
                      <MenuItem value={val.rankHolder}>
                        {val.rankHolder}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="group"
                    className="formtext"
                    id="groupId"
                    value={groupId}
                    placeholder="group"
                    name="groupId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {groupData.map((val) => (
                      <MenuItem value={val.id}>
                        {val.id}-{val.groupName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="danger">
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            {"Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
