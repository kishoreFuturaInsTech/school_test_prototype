import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";

import Button from "@mui/material/Button";
import "../Css/ContentAdd.css";
import SchoolTestApi from "../Service/SchoolTestApi";

function EditQuizParticipant({ open, close, data, setData, getall }) {
  const [participants, setparticipants] = useState([]);
  const [quiz, setquiz] = useState([]);

  const updatequizparticipant = (id) => {
    const quizparticipant = {
      userId: data.userId,
      quizId: data.quizId,
      noOfAttempts: data.noOfAttempts,
    };
    SchoolTestApi.updateQuizParticipant(id, quizparticipant)
      .then((res) => {
        console.log(res.data);
        getall();
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getusers = () => {
    SchoolTestApi.getAllUsers()
      .then((res) => {
        setparticipants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getquiz = () => {
    SchoolTestApi.getAllQuizHeaders()
      .then((res) => {
        setquiz(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    getusers();
    getquiz();
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={6} lg={4}>
            <TextField
              select
              label="Quiz Competation Name"
              className="formtext"
              placeholder="Quiz Competation Name"
              fullWidth
              name="quizId"
              value={data?.quizId}
              onChange={(e) => editChange(e)}
              variant="outlined"
              margin="dense"
            >
              {quiz.map((qui) => (
                <MenuItem value={qui.id}>{qui.quizName}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={8} md={6} lg={4}>
            <TextField
              select
              label="Participant"
              className="formtext"
              placeholder="Participant"
              fullWidth
              name="userId"
              value={data?.userId}
              onChange={(e) => editChange(e)}
              variant="outlined"
              margin="dense"
            >
              {participants.map((par) => (
                <MenuItem value={par.id}>{par.username}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={8} md={6} lg={4}>
            <TextField
              label="No of Attempts"
              className="formtext"
              placeholder="No of Attempts"
              fullWidth
              name="noOfAttempts"
              value={data?.noOfAttempts}
              variant="outlined"
              onChange={(e) => editChange(e)}
              margin="dense"
            />
          </Grid>
        </Grid>
      </Box>
      <div>
        <Button
          color="primary"
          variant="contained"
          style={{ marginRight: 10 }}
          type="submit"
          onClick={() => updatequizparticipant(data.id)}
        >
          {" "}
          Save{" "}
        </Button>

        <Button color="error" variant="contained" onClick={() => close()}>
          {" "}
          Cancel{" "}
        </Button>
      </div>
    </div>
  );
}

export default EditQuizParticipant;
