import React, { useState, useEffect } from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavDropdown } from "react-bootstrap";
import HomeIcon from "@mui/icons-material/Home";
import ProfileEdit from "../LoginAndSignup/ProfileEdit";
import SchoolTestApi from "../Service/SchoolTestApi";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "react-bootstrap";
import DraggableComponent from "../Service/DraggableComponent";

const Navbar = () => {
  const item = sessionStorage.getItem("condition");

  const [navigation, setNavigation] = useState("");

  const putNavigation = (val) => {
    setNavigation(val);
  };

  const [editOpen, setEditOpen] = useState(false);
  const [profile, setprofile] = useState(" ");

  const editClickOpen = (item) => {
    setprofile(item);
    setEditOpen(true);
  };

  const editClickClose = () => {
    setEditOpen(false);
  };

  const companyLogo = sessionStorage.getItem("logo");

  const [user, setuser] = useState("");

  const [proofslist, setProofslist] = useState(false);
  const [img, setImg] = useState("");
  const showProof = (file) => {
    setImg(file);
    setProofslist(true);
  };
  const closeProof = () => {
    setProofslist(false);
  };

  const getuserbyid = () => {
    SchoolTestApi.getUserById()
      .then((res) => {
        setuser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getuserbyid();
    return () => {};
  }, []);

  console.log(user.profile, "profile");

  return (
    <div>
      <Nav>
        <NavLink to="/homepage">
          <HomeIcon fontSize="large" />
        </NavLink>
        <img
          style={{ height: "4rem", width: "4rem" }}
          src={companyLogo}
          alt="LOGO"
        ></img>

        <NavMenu>
          {user === null ? null : (
            <Button onClick={() => showProof(user.profile)}>
              <Avatar
                alt={user.username}
                src={user.profile}
                sx={{ width: 56, height: 56 }}
              />
            </Button>
          )}
          {item === "true" ? null : (
            <NavLink to="login" activeStyle>
              <AccountCircleIcon />
            </NavLink>
          )}
          <NavLink to="logindetails" activeStyle>
            <p style={{ color: "white", marginTop: 15 }}>
              {" "}
              {sessionStorage.getItem("username")}{" "}
            </p>
          </NavLink>
          {item === "true" ? (
            <NavDropdown title={navigation}>
              <NavDropdown drop="end" title="Admin">
                <NavDropdown.Item href="dropdownSummary">
                  DropDown Summary
                </NavDropdown.Item>
                <NavDropdown.Item href="addressType">
                  Address Type
                </NavDropdown.Item>
                <NavDropdown.Item href="questionType">
                  Question Type
                </NavDropdown.Item>
                <NavDropdown.Item href="groupType">Group Type</NavDropdown.Item>
                <NavDropdown.Item href="userStatus">
                  User Status
                </NavDropdown.Item>
                <NavDropdown.Item href="studentGrade">
                  Student Grade
                </NavDropdown.Item>
                <NavDropdown.Item href="section">Section</NavDropdown.Item>
                <NavDropdown.Item href="rank">Rank</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown drop="end" title="Address Details">
                <NavDropdown.Item href="address">Address</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown drop="end" title="Company Details">
                <NavDropdown.Item href="company">Company</NavDropdown.Item>
                <NavDropdown.Item href="userGroup">User Group</NavDropdown.Item>
                <NavDropdown.Item href="teacher">Teacher </NavDropdown.Item>
                <NavDropdown.Item href="studentClass">
                  Student{" "}
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown drop="end" title="Quiz Section">
                <NavDropdown drop="end" title="Quizes">
                  <NavDropdown.Item href="quizHeader">
                    Quiz Header{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="quizQuestion">
                    Quiz Question{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="quizchoice">
                    Quiz Choice{" "}
                  </NavDropdown.Item>

                  <NavDropdown.Item href="quizparticipant">
                    Quiz Participant{" "}
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown drop="end" title="Answer Section">
                  <NavDropdown.Item href="quizanswer">
                    Quiz Answer{" "}
                  </NavDropdown.Item>
                </NavDropdown>
              </NavDropdown>
              <NavDropdown drop="end" title="Answer Sheet">
                <NavDropdown.Item href="answerSheet">
                  Answer Sheet{" "}
                </NavDropdown.Item>
              </NavDropdown>
            </NavDropdown>
          ) : null}

          {/*<NavLink to='/add' activeStyle>*/}
          {/*    Enroll Now*/}
          {/*</NavLink>*/}
          {/*<NavLink to='/candidates' activeStyle>*/}
          {/*    Candidates*/}
          {/*</NavLink>*/}
          {/*<NavLink to='/employee' activeStyle>*/}
          {/*    Employees*/}
          {/*</NavLink>*/}
          {/*<NavLink to='/emp-dashboard' activeStyle>*/}
          {/*    Dashboard*/}
          {/*</NavLink>*/}
          {/*<NavLink to="/bank" activeStyle>*/}
          {/*    Bank Accounts*/}
          {/*</NavLink>*/}
          {/*<NavLink to="/address" activeStyle>*/}
          {/*    Address*/}
          {/*</NavLink>*/}
          {/*<NavLink to="/client" activeStyle>*/}
          {/*    Clients*/}
          {/*</NavLink>*/}
          {/*<NavLink to="/agent" activeStyle>*/}
          {/*    Agent*/}
          {/*</NavLink>*/}
          {/*<NavLink to="/office" activeStyle>*/}
          {/*    Offices*/}
          {/*</NavLink>*/}
          {/*<NavLink to="/company" activeStyle>*/}
          {/*    Company*/}
          {/*</NavLink>*/}
          {/*{*/}
          {/*    item === "true" ?*/}
          {/*        <NavLink to="/logout" activeStyle>*/}
          {/*            <p style={{color:"white", marginTop:15, marginLeft:50}}> LogOut </p>*/}
          {/*        </NavLink> : null*/}
          {/*}*/}
        </NavMenu>
        {/*<NavBtn>*/}
        {/*    <NavLink>Sign In</NavLink>*/}
        {/*</NavBtn>*/}
      </Nav>
      <Modal
        dialogAs={DraggableComponent}
        show={proofslist}
        onHide={closeProof}
        centered
        size="lg"
      >
        <Modal.Body>
          <EditIcon
            color="primary"
            style={{ cursor: "pointer", marginRight: 10 }}
            onClick={() => editClickOpen(img)}
          />
          <div>
            <img src={img} width="600" height="250" />
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        dialogAs={DraggableComponent}
        show={editOpen}
        onHide={editClickClose}
        centered
        size="lg"
      >
        <Modal.Body>
          <div className="container">
            <ProfileEdit
              open={editOpen}
              close={editClickClose}
              data={profile}
              setData={setprofile}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Navbar;
