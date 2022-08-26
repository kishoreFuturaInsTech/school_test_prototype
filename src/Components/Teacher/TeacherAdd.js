import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import moment from "moment";
import axios from "axios";
import { Box, FormControl, FormHelperText, Grid } from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import Notification from "../Dialogs/Notification";

function TeacherAdd({
  open,
  handleClickClose,
  close,
  getdata,
  company,
  notify,
  setNotify,
  user,
}) {
  const userid = sessionStorage.getItem("userId");

  const [companyId, setcompanyId] = useState("");
  const [userId, setuserId] = useState("");
  const [teacherName, setteacherName] = useState("");
  const [teacherCode, setteacherCode] = useState("");
  const [graduation, setgraduation] = useState("");
  const [specialisation, setspecialisation] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");

  const handleFormSubmit = () => {
    let data = {
      companyId,
      userId,
      teacherName,
      teacherCode,
      graduation,
      specialisation,
      createdBy: userid,
      modifiedBy: userid,
    };

    axios
      .post(
        `http://localhost:8090/teacher/add/${userid}`,
        data,

        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
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
                onChange={(e) => setcompanyId(e.target.value)}
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
                label="User Id"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="User Id"
                onChange={(e) => setuserId(e.target.value)}
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
                label="Teacher Name"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setteacherName(e.target.value)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Teacher Code"
                name="teacherCode"
                label="Teacher Code"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setteacherCode(e.target.value)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Graduation"
                name="graduation"
                label="Graduation"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setgraduation(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="specialisation"
                name="specialisation"
                label="specialisation"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setspecialisation(e.target.value)}
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
        onClick={() => handleFormSubmit()}
      >
        Submit
      </Button>
      {open === true ? (
        <Button onClick={handleClickClose} color="error" variant="contained">
          Cancel
        </Button>
      ) : null}
      <Notification notify={notify} setNotify={setNotify} />;
    </div>
  );
}

export default TeacherAdd;
