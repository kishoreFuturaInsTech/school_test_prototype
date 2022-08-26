import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "../Css/ContentAdd.css";
import SchoolTestApi from "../Service/SchoolTestApi";

const AddQuizParticipant = ({ close, getall }) => {
  const [userId, setuserId] = useState("");
  const [quizId, setquizId] = useState("");
  const [noOfAttempts, setnoOfAttempts] = useState("");
  const [participants, setparticipants] = useState([]);
  const [quiz, setquiz] = useState([]);

  const savequizparticipant = () => {
    const quizparticipant = { userId, quizId, noOfAttempts };
    SchoolTestApi.addQuizParticipant(quizparticipant)
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
              onChange={(e) => setquizId(e.target.value)}
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
              onChange={(e) => setuserId(e.target.value)}
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
              variant="outlined"
              onChange={(e) => setnoOfAttempts(e.target.value)}
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
          onClick={() => savequizparticipant()}
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
};

export default AddQuizParticipant;
