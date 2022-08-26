import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "../Css/ContentAdd.css";
import SchoolTestApi from "../Service/SchoolTestApi";

const AddQuizAnswer = ({ close, getall }) => {
  const [quizQuestionNo, setquizQuestionNo] = useState("");
  const [answer, setanswer] = useState("");
  const [choiceId, setchoiceId] = useState("");
  const [question, setquestion] = useState([]);
  const [choice, setchoice] = useState([]);

  const savequizanswer = () => {
    const quizanswer = { quizQuestionNo, answer, choiceId };
    SchoolTestApi.addQuizAnswer(quizanswer)
      .then((res) => {
        console.log(res.data);
        getall();
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getquestion = () => {
    SchoolTestApi.getAllQuizQuestions()
      .then((res) => {
        setquestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getchoice = () => {
    SchoolTestApi.getAllQuizChoices()
      .then((res) => {
        setchoice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    return () => {
      getquestion();
      getchoice();
    };
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={6} lg={4}>
            <TextField
              select
              label="Question"
              className="formtext"
              placeholder="Question"
              fullWidth
              onChange={(e) => setquizQuestionNo(e.target.value)}
              variant="outlined"
              margin="dense"
            >
              {question.map((que) => (
                <MenuItem value={que.id}>{que.question}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={8} md={6} lg={4}>
            <TextField
              label="Answer"
              className="formtext"
              placeholder="Answer"
              fullWidth
              variant="outlined"
              onChange={(e) => setanswer(e.target.value)}
              margin="dense"
            />
          </Grid>
        </Grid>
        <Grid item xs={8} md={6} lg={4}>
          <TextField
            select
            label="Choice"
            className="formtext"
            placeholder="Choice"
            fullWidth
            onChange={(e) => setchoiceId(e.target.value)}
            variant="outlined"
            margin="dense"
          >
            {choice.map((ans) => (
              <MenuItem value={ans.id}>{ans.id}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Box>
      <div>
        <Button
          color="primary"
          variant="contained"
          style={{ marginRight: 10 }}
          type="submit"
          onClick={() => savequizanswer()}
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

export default AddQuizAnswer;
