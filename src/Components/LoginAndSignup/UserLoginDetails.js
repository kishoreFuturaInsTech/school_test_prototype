import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";
import { Row, Col, Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCounter } from "../Contexts/StoreContext";
import UserDetailsEdit from "./UserDetailsEdit";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserLoginDetails = () => {
  let navigate = useNavigate();

  const btnstyle = { margin: "8px 0", marginLeft: "1.5rem" };
  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "60%",
    margin: "1rem auto",
  };

  const { student, teacher } = useCounter();

  const agentid = sessionStorage.getItem("agent");
  const userId = sessionStorage.getItem("userId");

  const compId = sessionStorage.getItem("company");
  const refreshToken = sessionStorage.getItem("refreshtoken");

  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");

  const [company, setCompany] = useState([]);

  const formSubmit = () => {
    axios
      .post(`http://localhost:8090/api/auth/logout`, {
        userId,
        refreshToken,
      })
      .then((res) => {
        sessionStorage.clear();
        closeModal();
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const [modal, setModal] = useState(false);
  const closeModal = () => {
    setModal(false);
  };

  const userGroup = sessionStorage.getItem("userGroup");

  const checkTeacher = () => {
    if (teacher.id !== null && teacher.id !== undefined) {
      return (
        <>
          <h4> Teacher Details </h4>
          <p> Teacher Id : {teacher.id} </p>
          <p> Teacher Name : {teacher.teacherName} </p>
          <p> Teacher Code : {teacher.teacherCode} </p>
          <p> Teacher Graduation : {teacher.graduation} </p>
          <p> Teacher Specialisation : {teacher.specialisation} </p>
          <br />
          <h4> Company Details </h4>
          <p> Company Id : {teacher.company?.id} </p>
          <p> Company Code : {teacher.company?.companyCode} </p>
          <p> Company Section : {teacher.company?.companyName} </p>
          <p> GST : {teacher.company?.gst} </p>
          <p> CIN : {teacher.company?.cin} </p>
          <p> TIN : {teacher.company?.tin} </p>
          <p> PAN : {teacher.company?.pan} </p>
          <br />
        </>
      );
    } else {
      return null;
    }
  };
  const checkStudent = () => {
    if (student.id !== null && student.id !== undefined) {
      return (
        <>
          <h4>
            <b> Student Details</b>{" "}
          </h4>
          <Row>
            <Col>
              {" "}
              <h5> Student Id : {student.id} </h5>
            </Col>
            <Col>
              <h5> Student Code : {student.studentCode} </h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5> Student Rank : {student.rank} </h5>
            </Col>
            <Col>
              <h5> Student Class : {student.studentClass} </h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5> Student Section : {student.section} </h5>
            </Col>
          </Row>
          <br />
          <h4>
            <b> Company Details</b>{" "}
          </h4>
          <Row>
            <Col>
              <h5> Company Id : {student.company?.id} </h5>
            </Col>
            <Col>
              <h5> Company Code : {student.company?.companyCode} </h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5> Company Section : {student.company?.companyName} </h5>
            </Col>
            <Col>
              <h5> GST : {student.company?.gst} </h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5> CIN : {student.company?.cin} </h5>
            </Col>
            <Col>
              <h5> TIN : {student.company?.tin} </h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <p> PAN : {student.company?.pan} </p>
            </Col>
          </Row>
          <br />
        </>
      );
    } else {
      return null;
    }
  };

  console.log(student, "student");

  return (
    <div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Tooltip title="Back">
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/homepage"
          >
            <ArrowBackIcon />
          </Button>
        </Tooltip>
        <Button
          style={{ marginLeft: "10rem" }}
          color="error"
          variant="contained"
          onClick={() => setModal(true)}
        >
          <Tooltip title="Logout">
            <LogoutIcon style={{ cursor: "pointer" }} />
          </Tooltip>
        </Button>
      </div>
      <Paper elevation={10} style={paperStyle}>
        <span
          style={{
            display: "flex",
            textAlign: "center",
            fontFamily: "BerkshireSwash-Regular",
            justifyContent: "center",
          }}
        >
          <h3>
            <b> Personal Details</b>{" "}
          </h3>
          <EditIcon
            color="primary"
            onClick={() => navigate("/edituser")}
            style={{ marginLeft: 10, cursor: "pointer" }}
          />
        </span>

        <div
          style={{
            fontFamily: "BerkshireSwash-Regular",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <span>
            <h4>
              <b> User Details</b>{" "}
            </h4>
          </span>

          <Row>
            <Col>
              <h5> User Id : {userId}</h5>{" "}
            </Col>
            <Col>
              {" "}
              <h5>User Name : {username}</h5>{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <h5> User E-Mail : {email} </h5>{" "}
            </Col>
            <Col>
              {" "}
              <h5>User Group: {userGroup}</h5>{" "}
            </Col>
          </Row>

          <br />
          {checkStudent()}

          {checkTeacher()}
        </div>
      </Paper>

      <Modal show={modal} onHide={closeModal} centered size="sm">
        <Modal.Header closeButton> </Modal.Header>

        <Modal.Body>
          Do you want to log out ?
          <br />
          <br />
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => formSubmit()}
          >
            {" "}
            Yes{" "}
          </Button>
          <Button
            color="error"
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => closeModal()}
          >
            {" "}
            No{" "}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserLoginDetails;
