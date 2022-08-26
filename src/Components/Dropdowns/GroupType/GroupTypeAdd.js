import React, { useState } from "react";
import axios from "axios";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";

function GroupTypeAdd({ open, getdata, colse, handleClickClose }) {
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");

  const handleFormSubmit = () => {
    let data = {
      groupName,
      groupColor,
    };
    axios
      .post(`http://localhost:8090/group/add`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        handleClickClose();
        getdata();
        colse();
      });
  };

  return (
    <div>
      <form autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="groupName"
                label="Group Name"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Group Name"
                onChange={(e) => setGroupName(e.target.value)}
                required
              ></TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="groupColor"
                label="Group Color"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Group Color"
                onChange={(e) => setGroupColor(e.target.value)}
                required
              ></TextField>
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
    </div>
  );
}

export default GroupTypeAdd;
