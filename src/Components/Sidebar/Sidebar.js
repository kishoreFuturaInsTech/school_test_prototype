import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

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
import "../Css/Content.css";

const Nav = styled.div`
  background: #0a3161;
  height: 80px;
  display: flex;
  // justify-content: flex-start;
  // align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  // background: #b31942;
  background: #0a3161;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <div
            style={{
              display: "flex",
            }}
          >
            <Toolbar disableGutters>
              {/* <Tooltip title="Home">
                <IconButton
                  component={Link}
                  sx={{ flexGrow: 0, marginLeft: "3rem" }}
                  to="/homepage"
                  style={{ color: "white" }}
                >
                  <HomeIcon fontSize="large" />
                </IconButton>
              </Tooltip> */}
              <Tooltip title="Company Logo">
                <span
                  style={{
                    display: "flex",
                    marginLeft: "36rem",
                  }}
                >
                  {/* <h3 style={{ fontFamily: "Berkshire Swash", color: "white" }}>
                    Logo:
                  </h3> */}
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

              <Box sx={{ flexGrow: 0, marginLeft: "25rem" }}>
                <Tooltip title="User Name">
                  <IconButton component={Link} to="/logindetails" sx={{ p: 0 }}>
                    <span style={{ display: "flex" }}>
                      {/* <h3
                        style={{
                          fontFamily: "Berkshire Swash",
                          color: "white",
                        }}
                      >
                        User Name:
                      </h3> */}
                      <p
                        className="hovername"
                        style={{
                          color: "white",
                          marginLeft: "0.5rem",
                          marginTop: "0.5rem",
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
          </div>
        </Nav>

        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return (
                <SubMenu showSidebar={showSidebar} item={item} key={index} />
              );
            })}
          </SidebarWrap>
        </SidebarNav>
        <Modal
          dialogAs={DraggableComponent}
          show={proofslist}
          onHide={closeProof}
          centered
          size="lg"
        >
          <Modal.Body>
            <b>Edit Image</b>
            <EditIcon
              color="primary"
              style={{ cursor: "pointer" }}
              onClick={() => editClickOpen(img)}
            />
            <div style={{ textAlign: "center" }}>
              <img src={img} height="500rem" width="700rem" />
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          dialogAs={DraggableComponent}
          show={editOpen}
          onHide={editClickClose}
          centered
          size="md"
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
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
