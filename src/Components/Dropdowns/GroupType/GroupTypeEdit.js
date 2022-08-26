import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Box, FormControl, FormHelperText, Grid } from "@mui/material";

function GroupTypeEdit({ data, open, setData, getData, handleClickClose }) {
  let { groupName, groupColor } = data;
  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };
  const editFormSubmit = () => {
    const body = {
      // id: data.id,
      groupName: data.groupName,
      groupColor: data.groupColor,
    };
    axios
      .patch(`http://localhost:8090/group/update/${data.id}`, body, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        getData();
        handleClickClose();
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
                value={groupName}
                label="Group Name"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Group Name"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="groupColor"
                value={groupColor}
                label="Group Color"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Group Color"
                onChange={(e) => editChange(e)}
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
        onClick={() => editFormSubmit()}
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

export default GroupTypeEdit;
