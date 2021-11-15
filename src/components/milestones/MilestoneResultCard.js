import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { CalendarToday, Today } from "@mui/icons-material";

// const remoteURL = "http://localhost:7777";
export const MilestoneResultCard = ({ milestoneResult, milestone, user }) => {
  // const thisMilestoneTypeId = parseInt(milestone.milestoneTypeId)

  // //fetch milestoneType info by id show the properties where needed
  // const getMilestoneTypeData = (thisMilestoneTypeId) => {
  //   return fetch(`${remoteURL}/milestoneTypes/${thisMilestoneTypeId}`).then(results => results.json())
  // }
 let fullName = `${user.firstName} ${user.lastName}`;
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
        key={milestone.id}
      >
        <CardHeader
          title={milestone.name}
          subheader={fullName}
          component={Link}
          to={`/achievements/${milestoneResult.id}`}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {milestoneResult.timeToComplete !== 0 && (
              <>Time: {milestoneResult.timeToComplete} seconds</>
            )}

            {milestoneResult.distance !== 0 && (
              <>Distance &#40;feet&#41;: {milestoneResult.distance}</>
            )}

            {milestoneResult.height !== 0 && (
              <>Height &#40;inches&#41;: {milestoneResult.height}</>
            )}

            {milestoneResult.quantity !== 0 && (
              <>Amount: {milestoneResult.quantity}</>
            )}
          </Typography>
          <Typography variant="subtitle">
            Achieved: {milestoneResult.date}
          </Typography>
        </CardContent>
        <CardActions sx={{ alignItems: "stretch" }}>
          <Button
            component={Link}
            to={`/achievements/${milestoneResult.id}`}
            variant="text"
          >
            More Details
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
