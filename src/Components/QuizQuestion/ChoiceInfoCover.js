import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, makeStyles } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DraggableComponent from "../Service/DraggableComponent";
import axios from "axios";
import SchoolTestApi from "../Service/SchoolTestApi";
import AddQuizChoice from "../QuizChoice/AddQuizChoice";
// import {
//   Nav,
//   NavLink
// } from './NavbarElements';

const useStyles = makeStyles((theme) => ({
  BackGround: {
    backgroundColor: "#d50000",
    color: "white",
  },
}));

function ChoiceInfoCover({ getall, setcover, cover, id1, infoClickClose }) {
  const [quizchoice, setquizchoice] = useState([]);
  const classes = useStyles();

  const getallquizchoices = () => {
    SchoolTestApi.getAllQuizChoices()
      .then((res) => {
        setquizchoice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [add, setAdd] = useState(false);
  const addOpen = () => {
    setAdd(true);
  };
  const addClose = () => {
    setAdd(false);
    getchoicebyqid();
    getall();
  };

  const getchoicebyqid = () => {
    // axios.get(`http://localhost:8090/quizchoice/getbyquestionid/${id1}`).then((resp)=>{
    //   console.log("Refethcing Data Finished")
    //   setcover(resp.data)
    // }).catch((err)=>{console.log(err)})
    infoClickClose();
  };

  useEffect(() => {
    getallquizchoices();
  }, []);

  console.log("Cover", cover);
  return (
    <div>
      <Button>
        {cover === null ? (
          <AddBoxIcon
            fontSize="large"
            className={classes.BackGround}
            onClick={addOpen}
          />
        ) : null}
      </Button>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="tableheader">
          <TableRow className="tablerow">
            <TableCell className="tblhd" align="left">
              ID
            </TableCell>
            <TableCell className="tblhd" align="left">
              Choices
            </TableCell>
            <TableCell className="tblhd" align="left">
              Answer Key
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            <>
              {cover === null ? null : (
                <TableRow key={cover?.id}>
                  <TableCell align="left">{cover?.id}</TableCell>
                  <TableCell>
                    <ol>
                      {cover?.choice1 === null || "" ? null : (
                        <li>{cover?.choice1}</li>
                      )}
                      {cover?.choice2 === null || "" ? null : (
                        <li>{cover?.choice2}</li>
                      )}
                      {cover?.choice3 === null || "" ? null : (
                        <li>{cover?.choice3}</li>
                      )}
                      {cover?.choice4 === null || "" ? null : (
                        <li>{cover?.choice4}</li>
                      )}
                      {cover?.choice5 === null || "" ? null : (
                        <li>{cover?.choice5}</li>
                      )}
                      {cover?.choice6 === null || "" ? null : (
                        <li>{cover?.choice6}</li>
                      )}
                      {cover?.choice7 === null || "" ? null : (
                        <li>{cover?.choice7}</li>
                      )}
                      {cover?.choice8 === null || "" ? null : (
                        <li>{cover?.choice8}</li>
                      )}
                      {cover?.choice9 === null || "" ? null : (
                        <li>{cover?.choice9}</li>
                      )}
                    </ol>
                  </TableCell>
                  <TableCell align="left">{cover?.ans}</TableCell>
                </TableRow>
              )}
            </>
          }
        </TableBody>
      </Table>
      <Modal
        dialogAs={DraggableComponent}
        show={add}
        onHide={addClose}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title> Add Quiz Choice Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <AddQuizChoice
              open1={add}
              id={id1}
              close1={addClose}
              setcover={setcover}
              getqbyid={getchoicebyqid}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ChoiceInfoCover;
