import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import axios from "axios";
import { Box, FormControl, FormHelperText, Grid } from "@mui/material";

function UserStatusAdd({ open, handleClickClose, close, getdata }) {
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  const handleFormSubmit = () => {
    let data = {
      // id,
      shortDescription,
      longDescription,
    };
    axios
      .post(`http://localhost:8090/userStatus/add`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        console.log(resp);
        handleClickClose();
        getdata();
        close();
      });
  };
  return (
    <div>
      <from autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="shortDescription"
                label="Short Description"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Short Description"
                onChange={(e) => setShortDescription(e.target.value)}
                required
              ></TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="longDescription"
                label="Long Description"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Long Description"
                onChange={(e) => setLongDescription(e.target.value)}
                required
              ></TextField>
            </Grid>
          </Grid>
        </Box>
      </from>
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

export default UserStatusAdd;
