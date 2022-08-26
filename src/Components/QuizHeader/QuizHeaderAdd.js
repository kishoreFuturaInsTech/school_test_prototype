import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import axios from "axios";
import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  OutlinedInput,
  Select,
} from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import Notification from "../Dialogs/Notification";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function QuizHeaderAdd({
  open,
  handleClickClose,
  close,
  getdata,
  company,
  notify,
  setNotify,
  userId,
  handleUsers,
  userData,
}) {
  const [companyId, setCompanyId] = useState("");
  const [quizName, setQuizName] = useState("");

  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");

  const [passPerc, setPassPerc] = useState("");
  const [maxQuestions, setMaxQuestions] = useState("");
  const [maxAttempts, setMaxAttempts] = useState("");
  const [duration, setDuration] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [dateError, setDateError] = useState("");

  const id = sessionStorage.getItem("userId");

  const setendDate = (date) => {
    const start = moment(startdate).format("DD-MM-YYYY");
    const end = moment(date).format("DD-MM-YYYY");

    axios
      .get(
        `http://localhost:8090/quizHeader/datevalidation/${start.toString()}/${end.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data !== null) {
          setDateError(res.data);
        }
        setEndDate(date);
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = () => {
    const startDate = moment(startdate).format("MM-DD-YYYY");
    const endDate = moment(enddate).format("MM-DD-YYYY");
    let data = {
      companyId,
      quizName,

      startDate,
      endDate,

      passPerc,
      maxQuestions,
      maxAttempts,
      duration,
      // userId: userId,
      createdBy: id,
      modifiedBy: id,
    };

    axios
      .post(`http://localhost:8090/quizHeader/add/${id}`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        handleClickClose();
        getdata();
        setNotify({
          isOpen: true,
          message: "Created Successfully",
          type: "success",
        });
        close();
      });
  };
  return (
    <div>
      <form autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                fullWidth
                name="companyId"
                label="Company Id"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Company Id"
                onChange={(e) => setCompanyId(e.target.value)}
                required
              >
                {company.map((val) => (
                  <MenuItem value={val.id}>
                    {" "}
                    {val.id}-{val.companyName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                fullWidth
                placeholder="Quiz Name"
                name="quizName"
                label="Quiz Name"
                margin="dense"
                className="formtext"
                variant="outlined"
                onChange={(e) => setQuizName(e.target.value)}
                required
              ></TextField>
            </Grid>

            {/* <Grid item xs={8} md={6} lg={4}>
              <FormControl className="formtext" sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Users</InputLabel>
                <Select
                  className="formtext"
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={userId}
                  onChange={(e) => handleUsers(e)}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {userData.map((val) => (
                    <MenuItem key={val} value={val.id}>
                      <Checkbox checked={userId.indexOf(val.id) > -1} />
                      <ListItemText primary={val.username} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}

            <Grid item xs={8} md={6} lg={4}>
              <FormControl
                style={{ marginTop: "0.5rem" }}
                className="formtext"
                fullWidth
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd-MM-yyyy"
                    label="Start Date:"
                    className="formtext"
                    id="startDate"
                    value={startdate}
                    placeholder="Start Date:"
                    name="startDate"
                    onChange={(date) => setStartDate(date)}
                    fullWidth
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            {/* <Grid item xs={8} md={6} lg={4}>
              <FormControl
                style={{ marginTop: "0.5rem" }}
                className="formtext"
                fullWidth
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd-MM-yyyy"
                    label="End Date:"
                    className="formtext"
                    id="endDate"
                    value={enddate}
                    placeholder="End Date:"
                    name="endDate"
                    onChange={(date) => setEndDate(date)}
                    fullWidth
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid> */}
            <Grid item xs={8} md={6} lg={4}>
              <FormControl
                style={{ marginTop: "0.5rem" }}
                className="formtext"
                fullWidth
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd-MM-yyyy"
                    label="End Date:"
                    className="formtext"
                    id="endDate"
                    value={enddate}
                    placeholder="End Date:"
                    name="endDate"
                    onChange={(date) => setendDate(date)}
                    fullWidth
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <FormHelperText error>
                  {" "}
                  {dateError === null ? null : dateError}{" "}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Passing Percentage"
                name="passPerc"
                label="Passing Percentage"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setPassPerc(e.target.value)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Max Questions"
                name="maxQuestions"
                label="Max Questions "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setMaxQuestions(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Max Attempts"
                name="maxAttempts"
                label="Max Attempts "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setMaxAttempts(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Duration"
                name="duration"
                label="Duration "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setDuration(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Created By"
                name="createdBy"
                label="Created By "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setCreatedBy(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Modified By"
                name="modifiedBy"
                label="Modified By "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setModifiedBy(e.target.value)}
              />
            </Grid> */}
          </Grid>
        </Box>
      </form>
      <br />

      <Button
        color="primary"
        variant="contained"
        style={{ marginRight: 10 }}
        onClick={() => handleFormSubmit()}
      >
        Submit
      </Button>

      {open === true ? (
        <Button onClick={handleClickClose} color="error" variant="contained">
          Cancel
        </Button>
      ) : null}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default QuizHeaderAdd;
