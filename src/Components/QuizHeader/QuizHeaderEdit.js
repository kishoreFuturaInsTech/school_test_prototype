import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import axios from "axios";
import { Box, FormControl, FormHelperText, Grid } from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import Notification from "../Dialogs/Notification";

function QuizHeaderEdit({
  data,
  open,
  setData,
  getData,
  handleClickClose,
  notify,
  setNotify,
  company,
}) {
  const userId = sessionStorage.getItem("userId");

  let {
    companyId,
    quizName,
    startDate,
    endDate,
    passPerc,
    maxQuestions,
    maxAttempts,
    duration,
    createdBy,
    modifiedBy,
  } = data;

  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const editChangeDate = (date) => {
    setData({ ...data, startDate: date, endDate: date });
  };

  const [dateError, setDateError] = useState("");
  const setendDate = (date) => {
    const start = moment(startDate).format("DD-MM-YYYY");
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
        setData({ ...data, endDate: date });
      })
      .catch((err) => console.log(err));
  };

  const editFormSubmit = () => {
    const body = {
      id: data.id,
      companyId: data.companyId,
      quizName: data.quizName,
      passPerc: data.passPerc,
      maxQuestions: data.maxQuestions,
      maxAttempts: data.maxAttempts,
      duration: data.duration,
      createdBy: userId,
      modifiedBy: userId,
      startDate: moment(startDate).format("MM-DD-YYYY"),
      endDate: moment(endDate).format("MM-DD-YYYY"),
    };

    // const userid = sessionStorage.getItem("userid");

    axios
      .patch(
        `http://localhost:8090/quizHeader/update/${data.id}/${userId}`,
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
                value={companyId}
                label="Company Id"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Company Id"
                onChange={(e) => editChange(e)}
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
                value={quizName}
                label="Quiz Name"
                margin="dense"
                className="formtext"
                variant="outlined"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>

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
                    value={startDate}
                    placeholder="Start Date:"
                    name="startDate"
                    onChange={(date) => editChangeDate(date)}
                    fullWidth
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

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
                    value={endDate}
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
            </Grid> */}

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Passing Percentage"
                name="passPerc"
                value={passPerc}
                label="Passing Percentage"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Max Questions"
                name="maxQuestions"
                value={maxQuestions}
                label="Max Questions "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Max Attempts"
                name="maxAttempts"
                value={maxAttempts}
                label="Max Attempts "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Duration"
                name="duration"
                value={duration}
                label="Duration "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
      <br />

      <Button
        color="primary"
        variant="contained"
        style={{ marginRight: 10 }}
        onClick={() => editFormSubmit()}
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

export default QuizHeaderEdit;
