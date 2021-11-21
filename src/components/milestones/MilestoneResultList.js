import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  deleteUserMilestone,
  getAllUserMilestones,
} from "../../modules/APIManager";
import { MilestoneResultCard } from "./MilestoneResultCard";

// Show ALL milestone results in the database
export const MilestoneResultList = () => {
  // the initial state is an empty array
  const [milestoneResults, setMilestoneResults] = useState([]);

  const getMilestonResults = () => {
    return getAllUserMilestones().then((userMilestonesFromAPI) => {
      setMilestoneResults(userMilestonesFromAPI);
    });
  };

  const handleDeleteMilestoneResult = (id) => {
    deleteUserMilestone(id).then(() =>
      getAllUserMilestones().then(setMilestoneResults)
    );
  };

  useEffect(() => {
    getMilestonResults();
  }, []);

  return (
    <>
      <Typography variant="h4" component="h2">
        Milestone Achievements
      </Typography>
      <Typography variant="subtitle1">
      {milestoneResults.length} Achievements and counting! 
      </Typography>
      <Box
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          maxWidth: "100%",
          alignContent: "flex-start",
          flexBasis: 300,
        }}
      >
        {milestoneResults
          .map((milestoneResult) => (
            <>
              <MilestoneResultCard
                key={milestoneResult.id}
                milestoneResult={milestoneResult}
                milestone={milestoneResult.milestone}
                user={milestoneResult.user}
                handleDeleteMilestoneResult={handleDeleteMilestoneResult}
              />
            </>
          ))
          .reverse()}
      </Box>
    </>
  );
};
