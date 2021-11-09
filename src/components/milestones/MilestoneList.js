import { Grid } from "@mui/material";
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
      <h1>Checkout the Milestones!</h1>
      <div>
        {/* The Add Milestone button should only be visible if the logged-in user is an Admin */}
        <button disabled>
          Add Milestone{" "}
          <small>
            <em>coming soon</em>
          </small>
        </button>
      </div>
      <hr />
      <hr />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {milestones.map((milestone) => (
            <Grid item xs={4}>
                <MilestoneCard
                  key={milestone.id}
                  milestone={milestone}
                  milestoneType={milestone.milestoneType}
                />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* <div>
          {currentMilestones.map(currentMilestone => <MilestoneResultForm key={currentMilestone.id} currentMilestone={currentMilestone} currentMilestoneMilestoneType={currentMilestone.milestoneType} /> )}
      </div> */}
    </>
  );
};
