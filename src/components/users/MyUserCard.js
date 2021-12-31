import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GetAge } from "../helpers/GetAge";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Delete, Edit, EmojiEvents } from "@mui/icons-material";

export const MyUserCard = ({ user, handleDeleteUser }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  let fullName = `${user.firstName} ${user.lastName}`;
  let birthDateText = `Birthday: ${user.DOB}, Age: ${GetAge(user.DOB)}`;

  // I want to be able to show the total number of Milestone Achievements on the same line that links to the User's Milestone Achievements view

  return (
    <>
      <Card
        sx={{
          m: 1,
          flexShrink: 0,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: "100%",
          width: "100%",
          height: "auto",
        }}
        key={user.id}
      >
        <CardHeader
          title={fullName}
          subheader={birthDateText}
          component={Link}
          to={`/users/${user.id}`}
        />

        <CardContent>
          <Typography
            variant="body1"
            component="a"
            href={`mailto:${user.email}`}
          >
            Email&#58; {user.email}
          </Typography>
        </CardContent>
        <CardActions sx={{ alignItems: "stretch" }}>
          <Button
            startIcon={<EmojiEvents />}
            variant="contained"
            className="userMilestone__link"
            onClick={() => navigate(`/users/${user.id}/achievements`)}
          >
            Achievements
          </Button>

          <Button
            startIcon={<Edit />}
            variant="contained"
            onClick={() => navigate(`/users/${user.id}/edit`)}
          >
            Manage Account
          </Button>
          <Button
            startIcon={<Delete />}
            variant="outlined"
            onClick={handleClickOpen}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      {/* Add conditional statement that shows a link to All Milestones view when a user has no userMilestones (milestone results) */}

      <div>
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
            <Button variant="outlined" onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
