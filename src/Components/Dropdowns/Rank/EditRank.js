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

function EditRank({
    data,
    open,
    setData,
    getData,
    handleClickClose
}) {
    let {
       rankHolder
    } = data

    const editChange = (e) => {
        const {value, name} = e.target;
        setData ({...data,[name]: value});
    };

    const editFormSubmit = () => {
        const body ={
           rankHolder:data.rankHolder
        }
    
        axios.patch(`http://localhost:8090/rank/update/${data.id}`, body,{
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
            getData();
            handleClickClose();
        });
    
      }
  return (
    <div>
         <form autoComplete="off" >
            <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={2} columns={16}>
            <Grid item xs={8} >
                <TextField
                fullWidth
                name="rankHolder"
                value={rankHolder}
                label="Rank Holder"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Rank Holder"
                onChange={(e) => editChange(e)}
                required
                ></TextField>
              </Grid>
                </Grid>
            </Box>
        </form>
        <br/>
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
  )
}

export default EditRank