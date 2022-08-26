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
import SchoolTestApi from "../Service/SchoolTestApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/ContentAdd.css";

const UserDetailsEdit = () => {

    let navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "100vh",
    width: 500,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0", marginLeft: "1.5rem" };

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  const [profile, setprofile] = useState(" ");
  const [user,setuser]= useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
    const users= {username: user.username,
        email: user.email,
        password: user.password,
      }
    axios.patch(`http://localhost:8090/api/auth/user/update/${user.id}`,users).then((res) => {
    console.log(res.data);
    // sessionStorage.setItem("username",user.username)
    window.location="/logindetails"
    })
    .catch((err) => console.log(err));
  }
  // console.log("Profile",profile)

  const editChange = (e) => {
    const { value, name } = e.target;
    setuser({ ...user, [name]: value });
  };

  const getuserbyid=()=>{
    SchoolTestApi.getUserById().then((res)=>{
      setuser(res.data);
    }).catch((err)=>{console.log(err)})
  }

//   const uploadImage = async (e) => {
//     const file = e.target.files[0];
//     const base64 = await convertBase64(file);
//     setprofile(base64);
// };

// const convertBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);

//       fileReader.onload = () => {
//           resolve(fileReader.result);
//       };

//       fileReader.onerror = (error) => {
//           reject(error);
//       };
//   });
// };

useEffect(() => {
    getuserbyid();
    return () => {
    }
  }, [])

  return (
    <div>
    <Paper elevation={10} style={paperStyle}>
    <Grid align="center">
          <h2>Edit User Details</h2>
          <br />
    </Grid>
    <form onSubmit={handleSubmit} autoComplete="off">
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
    <TextField
                className="formtext"
                placeholder="Enter new username"
                value={user?.username}
                name="username"
                onChange={(e) => editChange(e)}
                fullWidth
              />
              <br/>
    <TextField
                className="formtext"
                placeholder="Enter your new E-Mail"
                value={user.email}
                name="email"
                onChange={(e) => editChange(e)}
                fullWidth
              />
              <br/>
    <TextField
                className="formtext"
                placeholder="Enter new password"
                type="password"
                name="password"
                // value={user.password}
                onChange={(e) => editChange(e)}
                fullWidth
              />
              <br/>
    {/* <div className="col" style={{marginLeft:23}}>
              <label> <h5> Upload Profile </h5> </label><br/> <br/>
                        <input
                            type="file"
                            onChange={(e) => uploadImage(e)}
                        />
    </div> */}
    <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Save
    </Button>
    </Grid>
    </Box>
    </form>
    </Paper>
    </div>
  )
}

export default UserDetailsEdit