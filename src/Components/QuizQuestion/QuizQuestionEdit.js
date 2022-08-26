import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import moment from "moment";
import axios from "axios";
import { Box, FormControl, FormHelperText, Grid } from "@mui/material";
import MenuItem from "@material-ui/core/MenuItem";
import Notification from "../Dialogs/Notification";
function QuizQuestionEdit({
  data,
  open,
  setData,
  getData,
  notify,
  setNotify,
  handleClickClose,
  questionTypes,
  questionCategories,
  quizheaders,
}) {
  const userId = sessionStorage.getItem("userId");
  let {
    id,
    quizHeader,
    question,
    questionType,
    questionCategory,
    createdBy,
    modifiedBy,
  } = data;

  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const editFormSubmit = () => {
    const body = {
      id: data.id,
      quizHeader: data.quizHeader,
      question: data.question,
      questionType: data.questionType,
      questionCategory: data.questionCategory,
      createdBy: userId,
      modifiedBy: userId,
    };

    // const userid = sessionStorage.getItem("userid");

    axios
      .patch(
        `http://localhost:8090/quizQuestion/update/${data.id}/${userId}`,
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
                name="quizHeader"
                value={quizHeader}
                label="Quiz Header Id"
                margin="dense"
                className="formtext"
                variant="outlined"
                placeholder="Quiz Header Id"
                onChange={(e) => editChange(e)}
                required
              >
                {quizheaders.map((val) => (
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
                value={question}
                label="Question"
                margin="dense"
                className="formtext"
                variant="outlined"
                onChange={(e) => editChange(e)}
                required
              ></TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                placeholder="Question Type Id"
                name="questionType"
                value={questionType}
                label="Question Type Id"
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
                required
              >
                {questionTypes.map((val) => (
                  <MenuItem value={val.id}>
                    {" "}
                    {val.shortDescription}-{val.longDescription}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                placeholder="Question Category Id"
                name="questionCategory"
                value={questionCategory}
                label="Question Category Id "
                margin="dense"
                className="formtext"
                fullWidth
                variant="outlined"
                onChange={(e) => editChange(e)}
              >
                {questionCategories.map((val) => (
                  <MenuItem value={val.id}>
                    {" "}
                    {val.shortDescription}-{val.longDescription}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
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

export default QuizQuestionEdit;
