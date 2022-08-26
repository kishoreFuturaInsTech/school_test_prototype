import axios from "axios";
class SchoolTestApi {
  getAllQuizQuestions() {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8090/quizQuestion/getall/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getQuizQuestionById(id) {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8090/quizchoice/${id}/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAllCompanies() {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8090/company/getall/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAllQuizHeaders() {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8090/quizHeader/getall/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAllUsers() {
    return axios.get(`http://localhost:8090/api/auth/user/getall`);
  }

  getAllQuizChoices() {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8090/quizchoice/getall/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addQuizChoice(quizchoice) {
    const userId = sessionStorage.getItem("userId");
    return axios.post(
      `http://localhost:8090/quizchoice/add/${userId}`,
      quizchoice,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updateQuizChoice(id, quizchoice) {
    const userId = sessionStorage.getItem("userId");
    return axios.patch(
      `http://localhost:8090/quizchoice/update/${id}/${userId}`,
      quizchoice,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  deleteQuizChoice(id) {
    const userId = sessionStorage.getItem("userId");
    return axios.patch(
      `http://localhost:8090/quizchoice/softdelete/${id}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  cloneQuizChoice(id) {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8090/quizchoice/clone/${id}/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAllQuizAnwers() {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8090/quizanswer/getall/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addQuizAnswer(quizanswer) {
    const userId = sessionStorage.getItem("userId");
    return axios.post(
      `http://localhost:8090/quizanswer/add/${userId}`,
      quizanswer,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updateQuizAnswer(id, quizanswer) {
    const userId = sessionStorage.getItem("userId");
    return axios.patch(
      `http://localhost:8090/quizanswer/update/${id}/${userId}`,
      quizanswer,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  deleteQuizAnswer(id) {
    const userId = sessionStorage.getItem("userId");
    return axios.patch(
      `http://localhost:8090/quizanswer/softdelete/${id}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  cloneQuizAnswer(id) {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8090/quizanswer/clone/${id}/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  getAllQuizParticipants() {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8090/quizparticipant/getall/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
  }

  addQuizParticipant(quizparticipant) {
    const userId = sessionStorage.getItem("userId");
    return axios.post(
      `http://localhost:8090/quizparticipant/add/${userId}`,
      quizparticipant,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  updateQuizParticipant(id, quizparticipant) {
    const userId = sessionStorage.getItem("userId");
    return axios.patch(
      `http://localhost:8090/quizparticipant/update/${id}/${userId}`,
      quizparticipant,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  deleteQuizParticipant(id) {
    const userId = sessionStorage.getItem("userId");
    return axios.patch(
      `http://localhost:8090/quizparticipant/softdelete/${id}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }

  verifyUser(id) {
    return axios.patch(`http://localhost:8090/api/auth/user/verify/${id}`);
  }

  getUserById() {
    const userId = sessionStorage.getItem("userId");
    return axios.get(`http://localhost:8090/api/auth/user/${userId}`);
  }

  cloneQuizPartcipant(id) {
    const userId = sessionStorage.getItem("userId");
    return axios.get(
      `http://localhost:8090/quizparticipant/clone/${id}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  }
}

export default new SchoolTestApi();
