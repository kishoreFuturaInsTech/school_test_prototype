import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import BusinessIcon from "@mui/icons-material/Business";
import QuizIcon from "@mui/icons-material/Quiz";
import ArticleIcon from "@mui/icons-material/Article";

export const SidebarData = [
  {
    title: "Home",
    path: "/homepage",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Admin",
    path: "#",
    icon: <AdminPanelSettingsIcon />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "DropDown Summary",
        path: "/dropdownSummary",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "Address Type",
        path: "/addressType",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "Question Type",
        path: "/questionType",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "Group Type",
        path: "/groupType",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "User Status",
        path: "/userStatus",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "Student Grade",
        path: "/studentGrade",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "Section",
        path: "/section",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "Rank",
        path: "/rank",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
    ],
  },
  {
    title: "Address Details",
    path: "#",
    icon: <MapsHomeWorkIcon />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Address",
        path: "address",
        icon: <KeyboardDoubleArrowRightIcon />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Company Details",
    path: "#",
    icon: <BusinessIcon />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Company",
        path: "/company",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "User Group",
        path: "/userGroup",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "Teacher",
        path: "/teacher",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "Student",
        path: "/studentClass",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
    ],
  },
  {
    title: "Quiz Section",
    path: "#",
    icon: <QuizIcon />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Quiz Header",
        path: "/quizHeader",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "Quiz Question",
        path: "/quizQuestion",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "Quiz Choice",
        path: "/quizchoice",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
      {
        title: "Quiz Participant",
        path: "/quizparticipant",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
    ],
  },
  {
    title: "Answer Sheet",
    path: "#",
    icon: <ArticleIcon />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Answer Sheet",
        path: "/answerSheet",
        icon: <KeyboardDoubleArrowRightIcon />,
      },
    ],
  },
];
