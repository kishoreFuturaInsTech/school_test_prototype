import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField, FormControl, Grid, Box } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DraggableComponent from "../Service/DraggableComponent";

import "../Css/ContentInfo.css";

export default function AnsTableInfo({
  open,
  handleClose,
  data,
  userData,
  quizData,
  handleFormSubmit,
  userGroupData,
}) {
  let { userId, quizId, testTakenById, personUniqueCode } = data;

  return (
    <div>
      <Modal
        show={open}
        dialogAs={DraggableComponent}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Answer Sheet Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="User"
                    className="formtext"
                    id="userId"
                    value={userId}
                    placeholder="User"
                    name="userId"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {userData.map((val) => (
                      <MenuItem value={val.id}>
                        {val.id}-{val.username}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Quiz"
                    className="formtext"
                    id="quizId"
                    value={quizId}
                    placeholder="Quiz"
                    name="quizId"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {quizData.map((val) => (
                      <MenuItem value={val.id}>
                        {val.id}-{val.quizName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    select
                    label="Test Taken By"
                    className="formtext"
                    id="testTakenById"
                    value={testTakenById}
                    placeholder="Test Taken By"
                    name="testTakenById"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {userGroupData.map((val) => (
                      <MenuItem value={val.id}>
                        {val.id}-{val?.userGroupName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={8} md={6} lg={4}>
                  <TextField
                    label="Person Unique Code"
                    className="formtext"
                    id="personUniqueCode"
                    value={personUniqueCode}
                    placeholder="Person Unique Code"
                    name="personUniqueCode"
                    inputProps={{ readOnly: true }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
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
