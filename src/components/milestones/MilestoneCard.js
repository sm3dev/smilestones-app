import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export const MilestoneCard = ({ milestone, milestoneType }) => {
  const navigate = useNavigate();

  return (
    <>
      <Card sx={{ maxWidth: 345 }} key={milestone.id}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {milestone.name}
          </Typography>
          <Typography variant="overline" component="div">
            {milestoneType.name}
          </Typography>
          <Typography variant="body2" component="div">
            {milestone.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ alignItems: "stretch" }}>
          <Button
            variant="contained"
            id={milestone.id}
            onClick={() =>
              navigate(`/milestones/${milestone.id}/achievements/create`)
            }
          >
            Submit Result
          </Button>
          <Button variant="outlined">Edit</Button>
        </CardActions>
        <CardActions>
          {" "}
          <Button disabled>Achievements for this Milestone</Button>
        </CardActions>
      </Card>
    </>
  );
};
