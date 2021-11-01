import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GetAge } from "../helpers/GetAge";
// import {Button } from '@mui/material';

export const MyUserCard = ({ user, handleDeleteUser }) => {
  const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const deleteWarning = () => {
  //   return (
  //       <>
  //             <Alert severity="error">This is an error alert — check it out!</Alert>
  //       <Alert
  //         variant="outlined"
  //         severity="warning"
  //         action={
  //           <>
  //             <Button onClick={() => handleDeleteUser(user.id)}>
  //               Delete
  //             </Button>
  //             <Button>
  //               <Link to="/users">Cancel</Link>
  //             </Button>
  //           </>
  //         }
  //       >
  //         <AlertTitle>Delete is forever</AlertTitle>
  //         Are you sure you want to delete this?
  //       </Alert>
  //       </>
  //   );
  // };

  const history = useHistory();
  // I want to be able to show the total number of Milestone Achievements on the same line that links to the User's Milestone Achievements view

  return (
    <>
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <div>Age: {GetAge(user.DOB)} </div>
      {/* Add conditional statement that shows a link to All Milestones view when a user has no userMilestones (milestone results) */}

      <div>
        <Button
          variant="outlined"
          className="userMilestone__link"
          onClick={() => history.push(`/achievements/user/${user.id}`)}
        >
          View {user.firstName}'s Achievements
        </Button>
        <Button
          variant="outlined"
          onClick={() => history.push(`/users/${user.id}/edit`)}
        >
          Manage Account
        </Button>
        <Button onClick={handleClickOpen}>delete</Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Permanently delete this User?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDeleteUser(user.id)}>
              Delete User
            </Button>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <hr />
    </>
  );
};
