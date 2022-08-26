import { useContext, createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const StoreContext = createContext();

export const useCounter = () => useContext(StoreContext);

const ContextProvider = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access, setSpecialAccess] = useState([]);

  const [error, setError] = useState(false);

  const accessMethod = (arr) => {
    arr.map((val) => access.push(val.method));
  };

  const studId = sessionStorage.getItem("student");

  const [student, setStudent] = useState([]);
  const userId = sessionStorage.getItem("userId");

  const getStudent = () => {
    axios
      .get(`http://localhost:8090/studentClass/${studId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => console.log(err));
  };
  const [teacher, setteacher] = useState([]);
  const teacherId = sessionStorage.getItem("teacher");

  const getTeacher = () => {
    axios
      .get(`http://localhost:8090/teacher/${teacherId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setteacher(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStudent();
    getTeacher();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8090/api/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.accessToken);
        sessionStorage.setItem("userId", response.data?.id);
        if (response.data.student !== null) {
          sessionStorage.setItem("student", response.data?.student?.id);
          sessionStorage.setItem("company", response.data?.student.company?.id);
        } else {
          sessionStorage.setItem("student", null);
        }

        if (response.data.teacher !== null) {
          sessionStorage.setItem("teacher", response.data?.teacher?.id);
          sessionStorage.setItem("company", response.data?.teacher.company?.id);
        } else {
          sessionStorage.setItem("teacher", null);
        }

        sessionStorage.setItem("username", response.data?.username);

        console.log(response.data?.username);
        sessionStorage.setItem("email", response.data?.email);

        if (response.data.userGroup !== null) {
          sessionStorage.setItem(
            "userGroup",
            response.data?.userGroup?.userGroupName
          );
        } else {
          sessionStorage.setItem("userGroup", null);
        }

        sessionStorage.setItem("refreshtoken", response.data?.refreshToken);
        accessMethod(response.data.specialAccess);
        sessionStorage.setItem("specialaccess", JSON.stringify(access));
        sessionStorage.setItem("condition", "true");
        sessionStorage.setItem(
          "logo",
          response.data.userGroup?.company?.companyLogo
        );
        navigate("/homepage");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
      });
  };

  let navigate = useNavigate();

  const values = {
    error,
    setError,
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    teacher,
    student,
    getStudent,

    access,
  };

  return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default ContextProvider;
