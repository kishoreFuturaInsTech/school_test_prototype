import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import HomeIcon from "@mui/icons-material/Home";
import ProfileEdit from "../LoginAndSignup/ProfileEdit";
import SchoolTestApi from "../Service/SchoolTestApi";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "react-bootstrap";
import DraggableComponent from "../Service/DraggableComponent";
import { Link } from "react-router-dom";
import "../Css/Content.css";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = () => {
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

  return (
    <>
      <AppBar style={{ backgroundColor: "black" }} position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Tooltip title="Home">
              <IconButton
                sx={{ flexGrow: 0 }}
                to="/homepage"
                style={{ color: "white" }}
              >
                <HomeIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Company Logo">
              <span style={{ display: "flex" }}>
                <h3 style={{ fontFamily: "Berkshire Swash" }}>Logo:</h3>
                <img
                  style={{
                    height: "3rem",
                    width: "4rem",
                    marginLeft: "0.5rem",
                  }}
                  src={companyLogo}
                  alt="LOGO"
                ></img>
              </span>
            </Tooltip>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="User Name">
                <IconButton component={Link} to="/logindetails" sx={{ p: 0 }}>
                  <span style={{ display: "flex" }}>
                    <h3
                      style={{ fontFamily: "Berkshire Swash", color: "white" }}
                    >
                      User Name:
                    </h3>
                    <p
                      className="hovername"
                      style={{
                        color: "white",
                        marginLeft: "0.5rem",
                        fontFamily: "Berkshire Swash",
                      }}
                    >
                      {" "}
                      {sessionStorage.getItem("username")}{" "}
                    </p>
                  </span>
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                marginLeft: "2rem",
              }}
            >
              <span style={{ display: "flex" }}>
                {/* <h3 style={{ fontFamily: "Berkshire Swash", color: "white" }}>
                  Profile Picture:
                </h3> */}

                <Tooltip title="Profile Picture">
                  <IconButton
                    onClick={() => showProof(user.profile)}
                    sx={{ p: 0, marginLeft: "0.5rem" }}
                  >
                    {user === null ? null : (
                      <Avatar
                        alt={user.username}
                        src={user.profile}
                        sx={{ width: 56, height: 56 }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </span>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
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
    </>
  );
};
export default ResponsiveAppBar;
