import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "../Css/ContentInfo.css";

export default function CompanyAdd({
  open,
  handleClose,
  data,
  companyData,
  groupData,
  userData,
  onChange,
  handleFormSubmit,
}) {
  let {
    userId,
    studentCode,
    studentClass,
    section,
    ranks,
    groupId,
    companyId,
  } = data;

  return (
    <div>
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Student Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="User Id"
                    className="formtext"
                    id="userId"
                    value={userId}
                    placeholder="User Id"
                    name="userId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {userData.map((val) => (
                      <MenuItem value={val.id} key={val.id}>
                        {val.id}-{val.username}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid> */}
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Student Code"
                    className="formtext"
                    id="studentCode"
                    value={studentCode}
                    placeholder="Student Code"
                    name="studentCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Student Class"
                    className="formtext"
                    id="studentClass"
                    value={studentClass}
                    placeholder="Student Class"
                    name="studentClass"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Section"
                    className="formtext"
                    id="section"
                    value={section}
                    placeholder="Section"
                    name="section"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Ranks"
                    className="formtext"
                    id="ranks"
                    value={ranks}
                    placeholder="Ranks"
                    name="ranks"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Company"
                    className="formtext"
                    id="companyId"
                    value={companyId}
                    placeholder="Company"
                    name="companyId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {companyData.map((val) => (
                      <MenuItem value={val.id}>
                        {val.id}-{val.companyName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="group"
                    className="formtext"
                    id="groupId"
                    value={groupId}
                    placeholder="group"
                    name="groupId"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {groupData.map((val) => (
                      <MenuItem value={val.id}>
                        {val.id}-{val.groupName}
                      </MenuItem>
                    ))}
                  </TextField>
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
