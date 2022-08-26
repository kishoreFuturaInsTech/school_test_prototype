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

function ProfileEdit({open, close, data, setData}) {

  let navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "100vh",
    width: 500,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0", marginLeft: "1.5rem" };

  const [profile, setprofile] = useState(" ");
  const [user,setuser]= useState("");

  const handleSubmit=(e)=>{
    e.preventDefault();
    const users= {
        profile: profile
      }
    axios.patch(`http://localhost:8090/api/auth/user/update/${user.id}`,users).then((res) => {
    console.log(res.data);
    window.location="/logindetails"
    })
    .catch((err) => console.log(err));
  }
  console.log("Profile",profile)

  const getuserbyid=()=>{
    SchoolTestApi.getUserById().then((res)=>{
      setuser(res.data);
    }).catch((err)=>{console.log(err)})
  }

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

useEffect(() => {
    getuserbyid();
    return () => {
    }
  }, [])

  return (
    <div>
        <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
              <h2>Edit Profile Picture</h2>
              <br />
        </Grid>
        <form onSubmit={handleSubmit} autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        <div className="col" style={{marginLeft:23}}>
              <label> <h5> Upload Profile </h5> </label><br/> <br/>
                        <input
                            type="file"
                            onChange={(e) => uploadImage(e)}
                        />
        </div>
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

export default ProfileEdit