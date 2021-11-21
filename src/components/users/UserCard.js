import React from "react";
import { Link } from "react-router-dom";
import { GetAge } from "../helpers/GetAge";
import { useNavigate } from "react-router";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

export const UserCard = ({ user, totalMilestoneResults }) => {
  const navigate = useNavigate();
  let fullName = `${user.firstName} ${user.lastName}`;
  let birthDateText = `Age: ${GetAge(user.DOB)}`;
  // I want to be able to show the total number of Milestone Achievements on the same line that links to the User's Milestone Achievements view

  return (
    <>
      <Card
        sx={{
            m: 2,
            flexShrink: 0,
            flexGrow: 0,
            width: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}
        key={user.id}
      >
        <CardHeader
          title={fullName}
          subheader={birthDateText}
          component={Link}
          to={`/users/${user.id}`}
        />
        <CardActions>
          <Button
            variant="contained"
            className="userMilestone__link"
            onClick={() => navigate(`/users/${user.id}/achievements`)}
          >
            {totalMilestoneResults} Achievements
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
