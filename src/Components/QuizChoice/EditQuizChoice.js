import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";

import Button from "@mui/material/Button";
import "../Css/ContentAdd.css";
import SchoolTestApi from "../Service/SchoolTestApi";

function EditQuizChoice({ open, close, data, setData, getall }) {
  const [question, setquestion] = useState([]);
  // const[choice1,setData]= useState("");
  // const[choice2,setData]= useState("");
  // const[choice3,setData]= useState("");
  // const[choice4,setData]= useState("");
  // const[choice5,setData]= useState("");
  // const[choice6,setData]= useState("");
  // const[choice7,setData]= useState("");
  // const[choice8,setData]= useState("");
  // const[choice9,setData]= useState("");
  let {
    companyId,
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
  } = data;
  const updatequizchoice = (id) => {
    const quizchoice = {
      companyId: companyId,
      noOfChoices: noOfChoices,
      choice1: choice1,
      choice2: choice2,
      choice3: choice3,
      choice4: choice4,
      choice5: choice5,
      choice6: choice6,
      choice7: choice7,
      choice8: choice8,
      choice9: choice9,
      ans: ans,
    };
    SchoolTestApi.updateQuizChoice(id, quizchoice).then((res) => {
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

  const onChangeChoice = (e, index) => {
    console.log(e.target, index);
    switch (index) {
      case 0:
        setData({ ...data, choice1: e.target.value });
        break;
      case 1:
        setData({ ...data, choice2: e.target.value });
        break;
      case 2:
        setData({ ...data, choice3: e.target.value });
        break;
      case 3:
        setData({ ...data, choice4: e.target.value });
        break;
      case 4:
        setData({ ...data, choice5: e.target.value });
        break;
      case 5:
        setData({ ...data, choice6: e.target.value });
        break;
      case 6:
        setData({ ...data, choice7: e.target.value });
        break;
      case 7:
        setData({ ...data, choice8: e.target.value });
        break;
      case 8:
        setData({ ...data, choice9: e.target.value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    return () => {
      getquestion();
    };
  }, []);

  const editChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
    console.log(name);
  };

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
              name="questionId"
              value={data?.questionId}
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
              label="No of Choices"
              className="formtext"
              placeholder="No of Choices"
              fullWidth
              name="noOfChoices"
              value={data?.noOfChoices}
              variant="outlined"
              onChange={(e) => editChange(e)}
              margin="dense"
            />
          </Grid>
          {choices.slice(0, data?.noOfChoices).map((value, index) => (
            <Grid item xs={8} md={6} lg={4} key={index}>
              <TextField
                label={"Choice " + parseInt(index + 1)}
                className="formtext"
                placeholder={"Choice" + parseInt(index + 1)}
                fullWidth
                value={choices[index]}
                variant="outlined"
                onChange={(e) => onChangeChoice(e, index)}
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
              name="ans"
              value={data?.ans}
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
          onClick={() => updatequizchoice(data.id)}
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

export default EditQuizChoice;
