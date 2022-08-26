import React from "react";
import TextField from "@mui/material/TextField";
import { Box, FormControl, Grid } from "@mui/material";

function QuizHeaderInfo({ info }) {
  return (
    <div>
      <form autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="Company Id"
                label="Company Id"
                value={info.companyId}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="Quiz Name"
                label="Quiz Name"
                value={info.quizName}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="Start Date"
                label="Start Date"
                value={info.startDate}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="End Date"
                label="End Date"
                value={info.endDate}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="Passing Percentage"
                label="Passing Percentage"
                value={info.passPerc}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="Max Questions"
                label="max Questions"
                value={info.maxQuestions}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="max Attempts"
                label="Max Attempts"
                value={info.maxAttempts}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="Duration"
                label="Duration"
                value={info.duration}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="Created By"
                label="Created By"
                value={info.createdBy}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="Modified BY"
                label="Modified By"
                value={info.modifiedBy}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="Created Date"
                label="Created Date"
                value={info.createdDate}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>

            <Grid item xs={8} md={6} lg={4}>
              <TextField
                name="Modified Date"
                label="Modified Date"
                value={info.modifiedDate}
                margin="dense"
                variant="outlined"
                inputProps={{ readOnly: true }}
              />{" "}
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
}

export default QuizHeaderInfo;
