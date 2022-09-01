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
import Notification from "../Dialogs/Notification";

function QuizQuestionAdd({
  open,
  picture,
  handleClickClose,
  close,
  getdata,
  questionTypes,
  questionCategories,
  quizheader,
  notify,
  setNotify,
  open1,
  close1,
  headerId,
  uploadImage,
}) {
  const userId = sessionStorage.getItem("userId");

  const [quizHeader, setquizHeader] = useState(open1 === true ? headerId : "");
  const [question, setquestion] = useState("");
  const [questionType, setquestionType] = useState("");
  const [questionCategory, setquestionCategory] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");

  const handleFormSubmit = () => {
    let data = {
      quizHeader,
      question,
      questionType,
      picture,
      questionCategory,
      createdBy: userId,
      modifiedBy: userId,
    };

    axios
      .post(`http://localhost:8090/quizQuestion/add/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        if (open1 === true) {
          close1();
        } else {
          handleClickClose();
          getdata();
          setNotify({
            isOpen: true,
            message: "Created Successfully",
            type: "success",
          });
        }
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
                name="quizHeader"
                value={quizHeader}
                label="Quiz Header Id"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Quiz Header Id"
                onChange={(e) => setquizHeader(e.target.value)}
                required
              >
                {quizheader.map((val) => (
                  <MenuItem value={val.id}>
                    {" "}
                    {val.id}-{val.quizName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                fullWidth
                placeholder="Question"
                name="question"
                label="Question"
                margin="dense"
                className="formtext"
                variant="outlined"
                onChange={(e) => setquestion(e.target.value)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                placeholder="Question Type Id"
                name="questionType"
                label="Question Type Id"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setquestionType(e.target.value)}
                required
              >
                {questionTypes.map((val) => (
                  <MenuItem value={val.id}> {val.longDescription}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                placeholder="Question Category Id"
                name="questionCategory"
                label="Question Category Id "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => setquestionCategory(e.target.value)}
              >
                {questionCategories.map((val) => (
                  <MenuItem value={val.id}> {val.shortDescription}</MenuItem>
                ))}
              </TextField>
            </Grid>
            {questionType === 3 && (
              <>
                <Grid item xs={8} md={6} lg={4}>
                  <div className="col" style={{ marginLeft: 23 }}>
                    <label>
                      {" "}
                      <h5> Picture </h5>{" "}
                    </label>
                    <br /> <br />
                    <input type="file" onChange={(e) => uploadImage(e)} />
                  </div>
                </Grid>
              </>
            )}
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
      {/* <Notification notify={notify} setNotify={setNotify} /> */}
    </div>
  );
}

export default QuizQuestionAdd;
