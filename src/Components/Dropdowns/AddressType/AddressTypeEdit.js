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

function AddressTypeEdit({ data, open, setData, getData, handleClickClose }) {
  let { shortDescription, longDescription } = data;

  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const editFormSubmit = () => {
    const body = {
      // id: data.id,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
    };

    axios
      .patch(`http://localhost:8090/addressType/update/${data.id}`, body, {
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
                name="shortDescription"
                value={shortDescription}
                label="Short Description"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Short Description"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="longDescription"
                value={longDescription}
                label="Long Description"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Long Description"
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

export default AddressTypeEdit;
