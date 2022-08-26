import React, { useState } from "react";
import axios from "axios";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";

function AddRank({ open, getdata, colse, handleClickClose }) {
  const [rankHolder, setRankHolder] = useState("");

  const handleFormSubmit = () => {
    let data = {
      rankHolder,
    };
    axios
      .post(`http://localhost:8090/rank/add`, data, {
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
                name="rankHolder"
                label="Rank Holder"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Rank Holder"
                onChange={(e) => setRankHolder(e.target.value)}
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

export default AddRank;
