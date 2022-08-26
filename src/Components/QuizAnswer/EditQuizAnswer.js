import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "../Css/ContentAdd.css";
import SchoolTestApi from "../Service/SchoolTestApi";

function EditQuizAnswer({ open, close, data, setData, getall }) {
  const [question, setquestion] = useState([]);
  const [choice, setchoice] = useState([]);

  const updatequizanswer = (id) => {
    const quizanswer = {
      quizQuestionNo: data.quizQuestionNo,
      answer: data.answer,
      choiceId: data.choiceId,
    };
    SchoolTestApi.updateQuizAnswer(id, quizanswer).then((res) => {
      getall();
      close();
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

  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
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
              value={data?.quizQuestionNo}
              name="quizQuestionNo"
              onChange={(e) => editChange(e)}
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
              name="answer"
              value={data?.answer}
              variant="outlined"
              onChange={(e) => editChange(e)}
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
            name="choiceId"
            value={data?.choiceId}
            onChange={(e) => editChange(e)}
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
          onClick={() => updatequizanswer(data.id)}
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

export default EditQuizAnswer;
