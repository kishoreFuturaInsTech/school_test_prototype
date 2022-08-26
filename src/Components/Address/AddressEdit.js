import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import moment from "moment";
import axios from "axios";
import { Box, FormControl, FormHelperText, Grid } from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import Notification from "../Dialogs/Notification";

function AddressEdit({
  data,
  open,
  setData,
  getData,
  handleClickClose,
  addressType,
  notify,
  setNotify,
}) {
  const userId = sessionStorage.getItem("userId");

  // const [notify, setNotify] = useState({
  //   isOpen: false,
  //   message: "",
  //   type: "",
  // });

  let {
    id,
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
    createdBy,
    modifiedBy,
  } = data;

  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const editFormSubmit = () => {
    const body = {
      addressTypeId: addressTypeId,
      postalCode: postalCode,
      address1: address1,
      address2: address2,
      address3: address3,
      address4: address4,
      address5: address5,
      district: district,
      state: state,
      country: country,
      mobile: mobile,
      createdBy: userId,
      modifiedBy: userId,
    };

    // const userid = sessionStorage.getItem("userid");

    axios
      .patch(
        `http://localhost:8090/address/update/${data.id}/${userId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        handleClickClose();
        getData();
        setNotify({
          isOpen: true,
          message: "Updated Successfully",
          type: "success",
        });
      });
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
                value={addressTypeId}
                label="Address Type Id"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Address Type Id"
                onChange={(e) => editChange(e)}
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
                value={address1}
                label="Address 1"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Address 2"
                name="address2"
                value={address2}
                label="Address 2"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Address 3"
                name="address3"
                value={address3}
                label="Address 3"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Address 4"
                name="address4"
                value={address4}
                label="Address 4"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Address 5"
                name="address5"
                value={address5}
                label="Address 5"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                fullWidth
                placeholder="Postal Code"
                name="postalCode"
                value={postalCode}
                label="Postal Code"
                margin="dense"
                className="formtext"
                variant="outlined"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="District"
                name="district"
                value={district}
                label="District"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="State"
                name="state"
                value={state}
                label="State"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Country"
                name="country"
                value={country}
                label="Country "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Mobile"
                name="mobile"
                value={mobile}
                label="Mobile "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
              />
            </Grid>
            {/* <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Created By"
                name="createdBy"
                value={createdBy}
                label="Created By "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                placeholder="Modified By"
                name="modifiedBy"
                value={modifiedBy}
                label="Modified By "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
              />
            </Grid> */}
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
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default AddressEdit;
