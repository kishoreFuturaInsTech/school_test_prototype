import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import moment from "moment";
import axios from "axios";
import { Box, FormControl, FormHelperText, Grid } from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import Notification from "../Dialogs/Notification";

function AddressAdd({
  open,
  handleClickClose,
  close,
  getdata,
  addressType,
  notify,
  setNotify,
}) {
  const userId = sessionStorage.getItem("userId");
  const [addressTypeId, setAddressTypeId] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [address4, setAddress4] = useState("");
  const [address5, setAddress5] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");

  const handleFormSubmit = () => {
    let data = {
      addressTypeId,
      postalCode,
      address1,
      address2,
      address3,
      address4,
      address5,
      district,
      state,
      country,
      mobile,
      createdBy: userId,
      modifiedBy: userId,
    };

    axios
      .post(
        `http://localhost:8090/address/add/${userId}`,
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
        setNotify({
          isOpen: true,
          message: "Created Successfully",
          type: "success",
        });
        close();
      });
  };

  const [arr, setarr] = useState([]);

  const addChoice = () => {
    arr.push(arr);
    console.log(arr);
  };

  return (
    <div>
      <form autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                fullWidth
                name="addressTypeId"
                label="Address Type Id"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Address Type Id"
                onChange={(e) => setAddressTypeId(e.target.value)}
                required
              >
                {addressType.map((val) => (
                  <MenuItem value={val.id}>
                    {" "}
                    {val.id}-{val.longDescription}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Address 1"
                name="address1"
                label="Address 1"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setAddress1(e.target.value)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Address 2"
                name="address2"
                label="Address 2"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setAddress2(e.target.value)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Address 3"
                name="address3"
                label="Address 3"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setAddress3(e.target.value)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Address 4"
                name="address4"
                label="Address 4"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setAddress4(e.target.value)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Address 5"
                name="address5"
                label="Address 5"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setAddress5(e.target.value)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                fullWidth
                placeholder="Postal Code"
                name="postalCode"
                label="Postal Code"
                margin="dense"
                className="formtext"
                variant="outlined"
                onChange={(e) => setPostalCode(e.target.value)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="District"
                name="district"
                label="District"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setDistrict(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="State"
                name="state"
                label="State"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Country"
                name="country"
                label="Country "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Mobile"
                name="mobile"
                label="Mobile "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setMobile(e.target.value)}
              />
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

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default AddressAdd;
