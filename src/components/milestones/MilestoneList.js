import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllMilestones } from "../../modules/APIManager";
import { MilestoneCard } from "./MilestoneCard";
// import { MilestoneResultForm } from "./MilestoneResultForm";

export const MilestoneList = () => {
  const [milestones, setMilestones] = useState([]);
  // const [currentMilestones, setCurrentMilestones] = useState([]);

  const getMilestones = () => {
    return getAllMilestones().then((milestonesFromAPI) => {
      setMilestones(milestonesFromAPI);
    });
  };

  useEffect(() => {
    getMilestones();
  }, []);

  // const getCurrentMilestones = () => {
  //   return getAllMilestones().then((milestonesFromAPI) => {
  //     setCurrentMilestones(milestonesFromAPI);
  //   });
  // };

  // useEffect(() => {
  //   getCurrentMilestones();
  // }, [])

  return (
    <>
      <Typography variant="h4" component="h1">
        Checkout the Milestones!
      </Typography>
      <ButtonGroup>
        <Button variant="outlined" disabled>
          Add Milestone
        </Button>
      </ButtonGroup>
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
        {milestones.map((milestone) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            milestoneType={milestone.milestoneType}
          />
        ))}
      </Box>

      {/* <div>
          {currentMilestones.map(currentMilestone => <MilestoneResultForm key={currentMilestone.id} currentMilestone={currentMilestone} currentMilestoneMilestoneType={currentMilestone.milestoneType} /> )}
      </div> */}
    </>
  );
};
