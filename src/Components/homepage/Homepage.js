import {
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AnswerSheet from "../AnswerSheet/AnswerSheet";
import { motion } from "framer-motion";

function Homepage() {
  const userGroup = sessionStorage.getItem("userGroup");

  const userId = sessionStorage.getItem("userId");

  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:8090/quizHeader/getall/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const [quizid, setquizid] = useState("");
  const [isAnswerSheet, setIsAnswerSheet] = useState(false);

  const quizAnswerSheet = (id) => {
    setquizid(id);
    setIsAnswerSheet(true);
    // Navigate("/homepage");
  };

  const [isOpen, setisOpen] = useState(false);

  return (
    <>
      {isAnswerSheet ? (
        <AnswerSheet quizid={quizid} setIsAnswerSheet={setIsAnswerSheet} />
      ) : (
        <>
          <h1
            style={{
              textAlign: "center",
              fontFamily: "BerkshireSwash-Regular",
            }}
          >
            <b>{userGroup} Dashboard</b>
          </h1>
          <motion.div
            onClick={() => setisOpen(!isOpen)}
            transition={{ layout: { duration: 1, type: "spring" } }}
            layout={true}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={3}
              layout="position"
              style={{
                width: isOpen ? "90%" : "50%",
                // width: "90%",
                paddingBottom: "2rem",
                fontFamily: "PT Sans Caption",
                backgroundColor: "#f5f5f5",
                border: "solid 5px gray",
                borderRadius: "1rem",
                boxShadow: "0px 10px 30px rgb(0,0,0,0.5)",
              }}
            >
              <motion.h3
                layout="position"
                style={{
                  textAlign: "center",
                  color: "#327da8",
                  marginLeft: "1rem",
                }}
              >
                Read Quiz Instruction
              </motion.h3>
              {isOpen && (
                <motion.div>
                  <br></br>
                  <ul>
                    <h5>
                      {" "}
                      <i>
                        <li>
                          To Pass the Quiz, you must secure a minimum of 70%
                        </li>
                      </i>
                    </h5>
                    <h5>
                      {" "}
                      <i>
                        <li>
                          Use faster,reliable and continued Internet Connection
                        </li>
                      </i>
                    </h5>
                    <h5>
                      {" "}
                      <i>
                        <li>
                          You can skip tough Questions and come back to it later
                        </li>
                      </i>
                    </h5>
                    <h5>
                      {" "}
                      <i>
                        <li>
                          The Quiz will start as soon as you click Start Quiz
                          Button
                        </li>
                      </i>
                    </h5>
                  </ul>
                </motion.div>
              )}
            </Paper>
          </motion.div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                fontFamily: "BerkshireSwash-Regular",
              }}
            >
              <b> Quizes Available</b>
            </h3>
            <Paper
              elevation={6}
              style={{
                width: "90%",
                padding: "2rem 0 2rem 0",
                backgroundColor: "#f5f5f5",
                border: "solid 5px gray",
                borderRadius: "1rem",
                boxShadow: "0px 10px 30px rgb(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                }}
              >
                {data.map((val) => (
                  <Paper
                    onClick={() => quizAnswerSheet(val.id)}
                    elevation={3}
                    style={{
                      width: "30%",

                      paddingBottom: "2rem",
                      marginLeft: "2rem",
                      textAlign: "center",
                      color: "#327da8",
                      backgroundColor: "#f5f5f5",
                      border: "solid 3px gray",
                    }}
                  >
                    <span>
                      <h2>{val.quizName}</h2>
                    </span>
                  </Paper>
                ))}
              </div>
            </Paper>
          </div>
        </>
      )}
    </>
  );
}

export default Homepage;
