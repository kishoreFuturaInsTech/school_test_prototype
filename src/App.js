import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import UserLoginDetails from "./Components/LoginAndSignup/UserLoginDetails";
import Login from "./Components/LoginAndSignup/Login";
import Signup from "./Components/LoginAndSignup/Signup";
import Company from "./Components/Company/Company";
import Address from "./Components/Address/Address";
import UserGroup from "./Components/UserGroup/UserGroup";
import Navbar from "./Components/Header/Navbar";
import QuizHeader from "./Components/QuizHeader/QuizHeader";
import QuizQuestion from "./Components/QuizQuestion/QuizQuestion";
import Teacher from "./Components/Teacher/Teacher";
import StudentClass from "./Components/StudentClass/StudentClass";
import ListQuizAnswer from "./Components/QuizAnswer/ListQuizAnswer";
import ListQuizChoice from "./Components/QuizChoice/ListQuizChoice";
import ListQuizParticipant from "./Components/QuizParticipant/ListQuizParticipant";
import ContextProvider from "./Components/Contexts/StoreContext";
import AddressType from "./Components/Dropdowns/AddressType/AddressType";
import GroupType from "./Components/Dropdowns/GroupType/GroupType";
import QuestionType from "./Components/Dropdowns/QuestionType/OuestionType";
import UserStatus from "./Components/Dropdowns/UserStatus/UserStatus";
import Section from "./Components/Dropdowns/Section/StudentSection";
import Rank from "./Components/Dropdowns/Rank/Rank";
import StudentGrade from "./Components/Dropdowns/StudentGrade/StudentGrade";
import Homepage from "./Components/homepage/Homepage";
import DropDownSummary from "./Components/DropDownSummary/DropDownSummary";
import AnsTable from "./Components/AnswerSheetTable/AnsTable";
import Verification from "./Components/LoginAndSignup/Verification";
import UserDetailsEdit from "./Components/LoginAndSignup/UserDetailsEdit";
import ResponsiveAppBar from "./Components/AppBar/ResponsiveAppBar";
import Sidebar from "./Components/Sidebar/Sidebar";
import { CssBaseline } from "@mui/material";
import "./App.css";
import RichTextEditor from "./Components/reactQuill/RichTextEditor";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      <CssBaseline />
      <ContextProvider>
        {/* <ResponsiveAppBar /> */}
        {pathname !== "/" &&
          pathname !== "/signup" &&
          pathname !== "/verify" && <Sidebar />}

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/logindetails" element={<UserLoginDetails />} />
          <Route exact path="/company" element={<Company />} />
          <Route exact path="/address" element={<Address />} />
          <Route exact path="/userGroup" element={<UserGroup />} />
          <Route exact path="/quizHeader" element={<QuizHeader />} />
          <Route exact path="/quizQuestion" element={<QuizQuestion />} />
          <Route exact path="/quizanswer" element={<ListQuizAnswer />} />
          <Route exact path="/quizchoice" element={<ListQuizChoice />} />
          <Route
            exact
            path="/quizparticipant"
            element={<ListQuizParticipant />}
          />
          <Route exact path="/teacher" element={<Teacher />} />
          <Route exact path="/studentClass" element={<StudentClass />} />
          <Route exact path="/addressType" element={<AddressType />} />
          <Route exact path="/questionType" element={<QuestionType />} />
          <Route exact path="/groupType" element={<GroupType />} />
          <Route exact path="/userStatus" element={<UserStatus />} />
          <Route exact path="/homepage" element={<Homepage />} />
          <Route exact path="/answerSheet" element={<AnsTable />} />
          <Route exact path="/dropdownSummary" element={<DropDownSummary />} />
          <Route exact path="/verify" element={<Verification />} />
          <Route exact path="/edituser" element={<UserDetailsEdit />} />
          <Route exact path="/section" element={<Section />} />
          <Route exact path="/rank" element={<Rank />} />
          <Route exact path="/studentGrade" element={<StudentGrade />} />
          <Route exact path="/richtext" element={<RichTextEditor />} />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
