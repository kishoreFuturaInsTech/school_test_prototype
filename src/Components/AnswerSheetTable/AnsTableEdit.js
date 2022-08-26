import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  TextField,
  FormControl,
  Grid,
  Box,
  Checkbox,
  Select,
  InputLabel,
} from "@mui/material";
import { MenuItem } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DraggableComponent from "../Service/DraggableComponent";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

import "../Css/ContentAdd.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function AnsTableAdd({
  open,
  handleClose,
  data,
  setData,
  questionData,
  onChange,
  userData,
  handleQuestions,
  handleFormSubmit,
  questionId,
  userGroupData,
  quizData,
}) {
  let { userId, quizId, testTakenById, personUniqueCode } = data;

  const [qhData, setQhData] = useState([]);

  const onChangeQuizHeader = () => {
    axios
      .get(`http://localhost:8090/quizQuestion/getQuestionByHeader/${quizId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setQhData(resp.data);
        console.log(resp.data, "check");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    onChangeQuizHeader();

    return () => {};
  }, [open]);

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
          <Modal.Title>Edit Questions to Answer Sheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={8} md={6}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    select
                    label="Quiz"
                    className="formtext"
                    id="quizId"
                    value={quizId}
                    placeholder="Quiz"
                    name="quizId"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {quizData?.map((val) => (
                      <MenuItem value={val?.id}>
                        {val?.id}-{val?.quizName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={8} md={6}>
                  <FormControl className="formtext" fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Questions
                    </InputLabel>
                    <Select
                      fullWidth
                      className="formtext"
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={questionId}
                      onChange={(e) => handleQuestions(e)}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {qhData.map((val) => (
                        <MenuItem key={val} value={val.id}>
                          <Checkbox checked={questionId.indexOf(val.id) > -1} />
                          <ListItemText primary={val.question} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* <Grid item xs={8} md={6}>
                  <TextField
                    select
                    label="User"
                    className="formtext"
                    id="userId"
                    value={userId}
                    placeholder="User"
                    name="userId"
                    onChange={(e) => onChange(e)}
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
                </Grid> */}

                <Grid item xs={8} md={6}>
                  <TextField
                    select
                    label="Test Taken By"
                    className="formtext"
                    id="testTakenById"
                    value={testTakenById}
                    placeholder="Test Taken By"
                    name="testTakenById"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  >
                    {userGroupData.map((val) => (
                      <MenuItem value={val.id}>
                        {val.id}-{val?.userGroupName}-{val?.companyName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* <Grid item xs={8} md={6}>
                  <TextField
                    label="Person Unique Code"
                    className="formtext"
                    id="personUniqueCode"
                    value={personUniqueCode}
                    placeholder="Person Unique Code"
                    name="personUniqueCode"
                    onChange={(e) => onChange(e)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid> */}
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
