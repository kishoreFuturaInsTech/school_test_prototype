import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "../Css/ContentAdd.css";
import SchoolTestApi from "../Service/SchoolTestApi";

const AddQuizChoice = ({
  close,
  getall,
  open,
  id,
  data,
  close1,
  open1,
  setcover,
  getqbyid,
}) => {
  const [questionId, setquestionId] = useState(open1 === true ? id : "");
  const [noOfChoices, setnoOfChoices] = useState("");
  const [choice1, setchoice1] = useState(null);
  const [choice2, setchoice2] = useState(null);
  const [choice3, setchoice3] = useState(null);
  const [choice4, setchoice4] = useState(null);
  const [choice5, setchoice5] = useState(null);
  const [choice6, setchoice6] = useState(null);
  const [choice7, setchoice7] = useState(null);
  const [choice8, setchoice8] = useState(null);
  const [choice9, setchoice9] = useState(null);
  const [ans, setans] = useState("");
  // const [choice,setchoice]= useState(["","","","","","","","",""]);
  const [question, setquestion] = useState([]);

  const savequizchoice = () => {
    const quizchoice = {
      questionId,
      noOfChoices,
      choice1,
      choice2,
      choice3,
      choice4,
      choice5,
      choice6,
      choice7,
      choice8,
      choice9,
      ans,
    };
    SchoolTestApi.addQuizChoice(quizchoice)
      .then((res) => {
        console.log(res.data);
        if (open1 === true) {
          close1();
          getqbyid();
        } else {
          close();
          getall();
        }
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

  const onChangeChoice = (val, index) => {
    console.log(val, index);
    switch (index) {
      case 0:
        setchoice1(val);
        break;
      case 1:
        setchoice2(val);
        break;
      case 2:
        setchoice3(val);
        break;
      case 3:
        setchoice4(val);
        break;
      case 4:
        setchoice5(val);
        break;
      case 5:
        setchoice6(val);
        break;
      case 6:
        setchoice7(val);
        break;
      case 7:
        setchoice8(val);
        break;
      case 8:
        setchoice9(val);
        break;
      default:
        break;
    }
    // setchoice1(val)
  };

  // const choicetext=(val) =>{

  //   }

  useEffect(() => {
    return () => {
      getquestion();
    };
  }, []);

  //  console.log(noOfChoices)
  //  for(let i=0; i<noOfChoices; i++){
  //    console.log("Index Top",i)
  //  }

  let choices = [
    choice1,
    choice2,
    choice3,
    choice4,
    choice5,
    choice6,
    choice7,
    choice8,
    choice9,
  ];
  // for(let i=0; i<noOfChoices; i++){
  //   dummy_arr.push("");
  // }
  //   console.log("Vengadesan");
  //   let j=[];
  //   for(let i=0;i<=noOfChoices;i++){
  //     console.log(i);
  //     j.push(i);
  // } console.log("Vengadesan End");
  // console.log(j);

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
              value={questionId}
              onChange={(e) => setquestionId(e.target.value)}
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
              label="No of Choices"
              className="formtext"
              placeholder="No of Choices"
              fullWidth
              value={noOfChoices}
              variant="outlined"
              onChange={(e) => setnoOfChoices(e.target.value)}
              margin="dense"
            />
          </Grid>
          {choices.slice(0, noOfChoices).map((value, index) => (
            <Grid item xs={8} md={6} lg={4} key={index}>
              <TextField
                label={"Choice " + parseInt(index + 1)}
                className="formtext"
                placeholder={"Choice" + parseInt(index + 1)}
                fullWidth
                value={choices[index]}
                variant="outlined"
                onChange={(e) => onChangeChoice(e.target.value, index)}
                margin="dense"
              />
            </Grid>
          ))}
          <Grid item xs={8} md={6} lg={4}>
            <TextField
              label="Answer Key"
              className="formtext"
              placeholder="Answer Key"
              fullWidth
              value={ans}
              variant="outlined"
              onChange={(e) => setans(e.target.value)}
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
          onClick={() => savequizchoice()}
        >
          {" "}
          Save{" "}
        </Button>

        <Button color="error" variant="contained" onClick={() => close1()}>
          {" "}
          Cancel{" "}
        </Button>
      </div>
    </div>
  );
};

export default AddQuizChoice;
