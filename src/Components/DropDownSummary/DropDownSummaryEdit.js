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

function DropDownSummaryEdit({
  data,
  open,
  setData,
  getData,
  handleClickClose,
}) {
  let { tableName, tableDescription } = data;

  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const editFormSubmit = () => {
    const body = {
      // id: data.id,
      tableName: data.tableName,
      tableDescription: data.tableDescription,
    };

    axios
      .patch(`http://localhost:8090/dropDown/update/${data.id}`, body, {
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
                name="tableName"
                value={tableName}
                label="Table Name"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Table Name"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="tableDescription"
                value={tableDescription}
                label="Table Description"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Table Description"
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

export default DropDownSummaryEdit;
