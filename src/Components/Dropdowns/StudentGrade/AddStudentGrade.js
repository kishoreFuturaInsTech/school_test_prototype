import React, { useState } from "react";
import axios from "axios";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";

function AddStudentGrade({ open, getdata, colse, handleClickClose, company }) {
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [companyId, setCompanyId] = useState("");

  const handleFormSubmit = () => {
    let data = {
      // id,
      shortDescription,
      longDescription,
      companyId,
    };
    axios
      .post(`http://localhost:8090/studentGrade/add`, data, {
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
      <from autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                select
                name="companyId"
                label="Company"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Company"
                onChange={(e) => setCompanyId(e.target.value)}
                required
              >
                {company.map((val, index) => (
                  <MenuItem value={val.id}>{val.companyName}</MenuItem>
                ))}
              </TextField>
            </Grid>
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

export default AddStudentGrade;
