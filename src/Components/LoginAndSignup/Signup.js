import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/ContentAdd.css";
import Notification from "../Dialogs/Notification";

const Signup = () => {
  let navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "auto",
    width: 500,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0", marginLeft: "1.5rem" };

  const [userGroupData, setUserGroupData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userGroupId, setuserGroupId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [studentId, setstudentId] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const [userGroupByCmpId, setuserGroupByCmpId] = useState([]);
  const [teacherByCmpId, setteacherByCmpId] = useState([]);
  const [studentByCmpId, setstudentByCmpId] = useState([]);

  const onChangeCompanyId = (cmpId) => {
    setCompanyId(cmpId);
    getstudByCmpId(cmpId);
    getTeacherByCmpId(cmpId);
    getUGByCmpId(cmpId);
  };

  // const userId = sessionStorage.getItem("userid");

  // const getstudData = () => {
  //   axios
  //     .get(`http://localhost:8090/studentClass/getall`)
  //     .then((res) => {
  //       setStudentData(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };
  const getstudByCmpId = (cmpId) => {
    axios
      .get(`http://localhost:8090/studentClass/getByCompanyId/${cmpId}`)
      .then((res) => {
        setstudentByCmpId(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getTeacherByCmpId = (cmpId) => {
    axios
      .get(`http://localhost:8090/teacher/getByCompanyId/${cmpId}`)
      .then((res) => {
        setteacherByCmpId(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getUGByCmpId = (cmpId) => {
    axios
      .get(`http://localhost:8090/userGroup/getByCompanyId/${cmpId}`)
      .then((res) => {
        setuserGroupByCmpId(res.data);
      })
      .catch((err) => console.log(err));
  };

  // const getuserGroupData = () => {
  //   axios
  //     .get(`http://localhost:8090/userGroup/getall`)
  //     .then((res) => {
  //       setUserGroupData(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const getcompanyData = () => {
    axios
      .get(`http://localhost:8090/company/getall`)
      .then((res) => {
        setCompanyData(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // getstudData();
    // getuserGroupData();
    getcompanyData();

    return () => {};
  }, []);

  const [profile, setprofile] = useState("");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8090/api/auth/signup`, {
        username,
        password,
        teacherId,
        studentId,
        userGroupId,
        email,
        profile,
        companyId,
      })
      .then((res) => {
        console.log(res.data);
        setNotify({
          isOpen: true,
          message: "User Registered Successfully",
          type: "success",
        });
        navigate("/verify");
      })
      .catch((err) => console.log(err));
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setprofile(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [usergrpName, setusergrpName] = useState("");

  const getUserGrpNameById = (cmpId) => {
    axios
      .get(`http://localhost:8090/userGroup/getUserGrpName/${cmpId}`)
      .then((res) => {
        setusergrpName(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onChangeUserGrp = (val) => {
    setuserGroupId(val);
    getUserGrpNameById(val);
  };

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>
          <br />
        </Grid>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <TextField
                className="formtext"
                label="User Name"
                value={username}
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
              />
              <br />
              <TextField
                className="formtext"
                label="E-Mail"
                value={email}
                placeholder="Enter your E-Mail"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              <br />
              <TextField
                className="formtext"
                label="Password"
                value={password}
                placeholder="Enter password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
              <br />
              <TextField
                select
                className="formtext"
                label="Company"
                value={companyId}
                placeholder="Enter Company"
                onChange={(e) => onChangeCompanyId(e.target.value)}
                fullWidth
              >
                {companyData.map((val) => (
                  <MenuItem key={val.id} value={val.id}>
                    {" "}
                    {val.companyName}{" "}
                  </MenuItem>
                ))}
              </TextField>
              <br />

              <TextField
                select
                className="formtext"
                label="User Group"
                value={userGroupId}
                placeholder="Enter User Group"
                onChange={(e) => onChangeUserGrp(e.target.value)}
                fullWidth
              >
                {userGroupByCmpId.map((val) => (
                  <MenuItem key={val.id} value={val.id}>
                    {" "}
                    {val.userGroupName} - {val.company.companyName}{" "}
                  </MenuItem>
                ))}
              </TextField>

              <br />
              {usergrpName === "Student" ? (
                <>
                  <TextField
                    select
                    className="formtext"
                    label="Student"
                    value={studentId}
                    placeholder="Enter Student"
                    onChange={(e) => setstudentId(e.target.value)}
                    fullWidth
                    required
                  >
                    {studentByCmpId.map((val) => (
                      <MenuItem key={val.id} value={val.id}>
                        {" "}
                        {val?.studentCode} - {val?.studentClass}:{val?.section}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              ) : null}

              <br />
              {usergrpName === "Teacher" ? (
                <>
                  <TextField
                    select
                    className="formtext"
                    label="Teacher"
                    value={teacherId}
                    placeholder="Enter Student"
                    onChange={(e) => setTeacherId(e.target.value)}
                    fullWidth
                    required
                  >
                    {teacherByCmpId.map((val) => (
                      <MenuItem key={val.id} value={val.id}>
                        {" "}
                        {val?.teacherCode} - {val?.teacherName}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              ) : null}

              <div className="col" style={{ marginLeft: 23 }}>
                <label>
                  {" "}
                  <h5> Upload Profile </h5>{" "}
                </label>
                <br /> <br />
                <input type="file" onChange={(e) => uploadImage(e)} />
              </div>

              <br />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Sign Up
              </Button>
            </Grid>

            <br />
            {/*<Grid container spacing={2}>*/}
            {/*    <Typography style={{marginLeft:150}}>*/}
            {/*        <Link href="#">Forgot password ?</Link>*/}
            {/*    </Typography>*/}
            {/*</Grid>*/}

            <Grid container spacing={2}>
              <Typography style={{ marginLeft: 100 }}>
                Already have an Account ? <Link href="/">Login</Link>
              </Typography>
            </Grid>
          </Box>
        </form>
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Signup;
