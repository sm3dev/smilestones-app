import React, { useEffect, useState } from "react";
import { getAllMilestones, getAllUserMilestonesByUserID } from "../../modules/APIManager";
import { MilestoneCard } from "./MilestoneCard";

export const MilestoneList = () => {
  const [milestones, setMilestones] = useState([]);
  const [userMilestoneResults, setUserMilestoneResults] = useState([]);

  const getMilestones = () => {
    return getAllMilestones().then((milestonesFromAPI) => {
      setMilestones(milestonesFromAPI);
    });
  };

  const getUserMilestoneResults = (userId) => {
    return getAllUserMilestonesByUserID(userId).then(userMilestonesFromAPI => {
        setUserMilestoneResults(userMilestonesFromAPI)
    })
  }

  useEffect(() => {
      getMilestones();
  }, [])

  return (
      <>
      <h2>All Milestones</h2>
      <div>
          {/* The Add Milestone button should only be visible if the logged-in user is an Admin */}
          <button>Add Milestone</button></div>
      <div>
          {milestones.map(milestone => <MilestoneCard key={milestone.id} milestone={milestone} milestoneType={milestone.milestoneType} />) }
      </div>
      </>
  );
};
