import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import Controls from "../Controls/Controls";
import DeleteIcon from "@mui/icons-material/Delete";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { color } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

export default function AddQuestions(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <QuestionMarkIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle1" style={{ color: "#f50057" }}>
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text="No"
          color="default"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.Button
          text="Yes"
          color="primary"
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
