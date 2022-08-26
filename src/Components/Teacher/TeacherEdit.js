import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import moment from "moment";
import axios from "axios";
import { Box, FormControl, FormHelperText, Grid } from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import Notification from "../Dialogs/Notification";

function TeacherEdit({
  data,
  open,
  setData,
  getData,
  handleClickClose,
  company,
  notify,
  setNotify,
  user,
}) {
  const userid = sessionStorage.getItem("userId");
  let {
    id,
    companyId,
    userId,
    teacherName,
    teacherCode,
    graduation,
    specialisation,
    createdBy,
    modifiedBy,
  } = data;

  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const editFormSubmit = () => {
    const body = {
      id: data.id,
      companyId: data.companyId,
      userId: data.userId,
      teacherName: data.teacherName,
      teacherCode: data.teacherCode,
      graduation: data.graduation,
      specialisation: data.specialisation,
      createdBy: userid,
      modifiedBy: userid,
    };
    axios
      .patch(
        `http://localhost:8090/teacher/update/${data.id}/${userid}`,
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

            {/* <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                fullWidth
                name="userId"
                value={userId}
                label="User Id"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="User Id"
                onChange={(e) => editChange(e)}
                required
              >
                {user.map((val) => (
                  <MenuItem value={val.id}>
                    {" "}
                    {val.id}-{val.username}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Teacher Name"
                name="teacherName"
                value={teacherName}
                label="Teacher Name"
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
                placeholder="Teacher Code"
                name="teacherCode"
                value={teacherCode}
                label="Teacher Code"
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
                placeholder="Graduation"
                name="graduation"
                value={graduation}
                label="Graduation"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="specialisation"
                name="specialisation"
                value={specialisation}
                label="Stspecialisationate"
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

export default TeacherEdit;
