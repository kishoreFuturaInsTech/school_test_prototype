import { Paper } from "@material-ui/core";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SchoolTestApi from "../Service/SchoolTestApi";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";

const Verification = ({ mail }) => {
  const [user, setuser] = useState("");
  const [code, setcode] = useState("");
  let navigate = useNavigate();

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 500,
    margin: "20px auto",
  };
  // const btnstyle = { margin: "8px 0", marginLeft: "1.5rem" };

  const verify = () => {
    const c = code;
    SchoolTestApi.verifyUser(c).then((res) => {
      console.log(res.data);
      navigate("/");
    });
  };

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <TextField
          label="Enter Verification Code"
          placeholder="Enter Verification Code"
          variant="outlined"
          style={{ marginBottom: "1rem" }}
          onChange={(e) => setcode(e.target.value)}
          margin="dense"
          fullWidth
        />

        <Button
          color="primary"
          variant="contained"
          // style={btnstyle}
          fullWidth
          onClick={() => verify()}
        >
          Click Here To Verify Your Account
        </Button>
      </Paper>
    </div>
  );
};

export default Verification;
