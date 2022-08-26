import React, { useState } from "react";
import axios from "axios";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";

function DropDownSummaryAdd({ open, getdata, colse, handleClickClose }) {
  const [tableName, setTableName] = useState("");
  const [tableDescription, setTableDescription] = useState("");

  const handleFormSubmit = () => {
    let data = {
      // id,
      tableName,
      tableDescription,
    };
    axios
      .post(
        `http://localhost:8090/dropDown/add`,

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
        colse();
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
                name="tableName"
                label="Table Name"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Table Name"
                onChange={(e) => setTableName(e.target.value)}
                required
              ></TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="tableDescription"
                label="Table Description"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Table Description"
                onChange={(e) => setTableDescription(e.target.value)}
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

export default DropDownSummaryAdd;
