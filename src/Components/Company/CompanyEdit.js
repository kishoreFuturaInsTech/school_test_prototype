import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../Css/ContentEdit.css";
import DraggableComponent from "../Service/DraggableComponent";

export default function CompanyEdit({
  open,
  handleClose,
  data,
  addressData,
  onChangeCinDate,
  onChange,
  handleFormSubmit,
  uploadImage,
}) {
  let {
    companyCode,
    companyName,
    companyShortName,
    companyLongName,
    addressId,
    gst,
    cin,
    cinDate,
    tin,
    pan,
    companyLogo,
  } = data;

  return (
    <div>
      <Modal
        show={open}
        onHide={handleClose}
        dialogAs={DraggableComponent}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Company Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Company Code"
                    className="formtext"
                    id="companyCode"
                    value={companyCode}
                    placeholder="Company Code"
                    name="companyCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Company Name"
                    className="formtext"
                    id="companyName"
                    value={companyName}
                    placeholder="Company Name"
                    name="companyName"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Company Short Name"
                    className="formtext"
                    id="companyShortName"
                    value={companyShortName}
                    placeholder="Company Short Name"
                    name="companyShortName"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Company Long Name"
                    className="formtext"
                    id="companyLongName"
                    value={companyLongName}
                    placeholder="Company Long Name"
                    name="companyLongName"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Address"
                    className="formtext"
                    id="addressId"
                    value={addressId}
                    placeholder="Address"
                    name="addressId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {addressData.map((val) => (
                      <MenuItem value={val.id}>
                        {val.id}-{val.addressType.longDescription}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="GST"
                    className="formtext"
                    id="gst"
                    value={gst}
                    placeholder="GST"
                    name="gst"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="CIN"
                    className="formtext"
                    id="cin"
                    value={cin}
                    placeholder="CIN"
                    name="cin"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <FormControl
                    style={{ marginTop: "0.5rem" }}
                    className="formtext"
                    fullWidth
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="Cin Date:"
                        className="formtext"
                        id="cinDate"
                        value={cinDate}
                        placeholder="Cin Date:"
                        name="cinDate"
                        onChange={(e) => onChangeCinDate(e)}
                        fullWidth
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="TIN"
                    className="formtext"
                    id="tin"
                    value={tin}
                    placeholder="TIN"
                    name="tin"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="PAN"
                    className="formtext"
                    id="pan"
                    value={pan}
                    placeholder="PAN"
                    name="pan"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <div className="col" style={{ marginLeft: 23 }}>
                    <label>
                      {" "}
                      <h5> Company Logo </h5>{" "}
                    </label>
                    <br /> <br />
                    <input type="file" onChange={(e) => uploadImage(e)} />
                  </div>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <img
                    style={{
                      height: "5rem",
                      width: "5rem",
                      marginLeft: "1rem",
                    }}
                    src={companyLogo}
                  ></img>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="danger">
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleFormSubmit()}>
            {"Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
