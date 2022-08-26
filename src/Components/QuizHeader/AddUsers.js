import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  TextField,
  FormControl,
  Grid,
  Box,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  InputLabel,
} from "@mui/material";
import { MenuItem } from "@material-ui/core";
import Notification from "../Dialogs/Notification";

import "../Css/ContentAdd.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

export default function CompanyAdd({
  open,
  handleClickClose,
  data,
  getData,
  notify,
  setNotify,
  userData,
  setData,
  company,
}) {
  const [userId, setUserId] = useState([]);

  const { companyId, companyName } = data;

  const onChange = (e) => {
    const { value, name } = e.target;
    setUserId(value);
  };

  const handleFormSubmit = () => {
    const body = {
      userId: userId,
    };

    // const userid = sessionStorage.getItem("userid");

    axios
      .patch(
        `http://localhost:8090/quizHeader/update/${
          data.id
        }/${sessionStorage.getItem("userId")}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        handleClickClose();
        getData();
        setNotify({
          isOpen: true,
          message: "Updated Successfully",
          type: "success",
        });
      });
  };

  const [userGroup, setuserGroup] = useState("");

  const [studentData, setstudentData] = useState([]);
  const [teacherData, setteacherData] = useState([]);

  const getstudByCmpId = () => {
    axios
      .get(`http://localhost:8090/studentClass/getByCompanyId/${companyId}`)
      .then((res) => {
        setstudentData(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getTeacherByCmpId = () => {
    axios
      .get(`http://localhost:8090/teacher/getByCompanyId/${companyId}`)
      .then((res) => {
        setteacherData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [studentClass, setstudentClass] = useState("");

  const [studentGrade, setstudentGrade] = useState([]);

  const getAllStudentByGrade = () => {
    axios
      .get(
        `http://localhost:8090/studentGrade/getAllByCompanyId/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setstudentGrade(resp.data);
      })
      .catch((err) => console.log(err));
  };

  const [students, setstudents] = useState([]);

  const getByStudentClass = () => {
    axios
      .get(
        `http://localhost:8090/studentClass/getByStudentClass/${studentClass}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        setstudents(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getByStudentClass();

    return () => {};
  }, [studentClass]);

  useEffect(() => {
    getstudByCmpId();
    getTeacherByCmpId();
    getAllStudentByGrade();

    return () => {};
  }, [open]);

  return (
    <div>
      <Modal
        show={open}
        onHide={handleClickClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Users to QuizHeader</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    fullWidth
                    value={companyName}
                    name="companyId"
                    label="Company Id"
                    margin="dense"
                    className="formtext"
                    variant="outlined"
                    placeholder="Company Id"
                    // onChange={(e) => setCompanyId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={8} md={6}>
                  <TextField
                    select
                    fullWidth
                    value={userGroup}
                    name="userGroup"
                    label="User Group"
                    margin="dense"
                    className="formtext"
                    variant="outlined"
                    placeholder="User Group"
                    onChange={(e) => setuserGroup(e.target.value)}
                  >
                    <MenuItem key="Student" value="Student">
                      Student
                    </MenuItem>
                    <MenuItem key="Teacher" value="Teacher">
                      Teacher
                    </MenuItem>
                  </TextField>
                </Grid>

                {userGroup === "Student" ? (
                  <>
                    <Grid item xs={8} md={6}>
                      <TextField
                        select
                        fullWidth
                        value={studentClass}
                        name="studentClass"
                        label="Student Class"
                        margin="dense"
                        className="formtext"
                        variant="outlined"
                        placeholder="Student Class"
                        onChange={(e) => setstudentClass(e.target.value)}
                      >
                        {studentGrade.map((val, index) => (
                          <MenuItem value={val.shortDescription}>
                            {val.shortDescription}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={8} md={6}>
                      <FormControl className="formtext" fullWidth>
                        <InputLabel id="demo-multiple-checkbox-label">
                          Users
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={userId}
                          onChange={(e) => onChange(e)}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {students.map((val) => (
                            <MenuItem key={val.id} value={val.userId}>
                              {val.userId !== null && (
                                <>
                                  <Checkbox
                                    checked={userId?.indexOf(val?.userId) > -1}
                                  />
                                  <ListItemText primary={val?.studentCode} />
                                </>
                              )}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={8} md={6}>
                      <FormControl className="formtext" fullWidth>
                        <InputLabel id="demo-multiple-checkbox-label">
                          Users
                        </InputLabel>
                        <Select
                          fullWidth
                          className="formtext"
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={userId}
                          onChange={(e) => onChange(e)}
                          input={<OutlinedInput label="Tag" />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {teacherData.map((val) => (
                            <MenuItem key={val} value={val.userId}>
                              {val.userId !== null && (
                                <>
                                  <Checkbox
                                    checked={userId?.indexOf(val?.userId) > -1}
                                  />
                                  <ListItemText primary={val?.teacherName} />
                                </>
                              )}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClickClose} variant="danger">
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            {"Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
