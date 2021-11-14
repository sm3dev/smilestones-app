import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAllUserMilestonesByUserID } from "../../modules/APIManager";
import { MilestoneResultCard } from "./MilestoneResultCard";

// Shows Milestone Results List by a User
export const MilestoneResultListbyUser = () => {
  const { userId } = useParams();
  // the initial state is an empty array
  const [milestoneResults, setMilestoneResults] = useState([]);
  const [thisUser, setThisUser] = useState({});

  const getMilestonResults = (userId) => {
    return getAllUserMilestonesByUserID(userId).then(
      (userMilestonesFromAPI) => {
        setMilestoneResults(userMilestonesFromAPI);

        //I should probably user .find() here, but I'm using array index "0".
        // Why do it this way? The entire array has identical userId values because the fetch call gets the userId property
        setThisUser(userMilestonesFromAPI[0].user);
      }
    );
  };

  useEffect(() => {
    getMilestonResults(userId);
  }, [userId]);

  return (
    <>
      <div>
        <h1>Personal Achievements</h1>
        <p>Viewing Achievements for {thisUser.firstName} {thisUser.lastName}</p>
      </div>
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
        {milestoneResults.map((milestoneResult) => 
          <MilestoneResultCard
            key={milestoneResult.id}
            milestoneResult={milestoneResult}
            milestone={milestoneResult.milestone}
            user={milestoneResult.user}
          />
        )}
      </Box>
    </>
  );
};
