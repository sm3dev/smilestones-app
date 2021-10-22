import React, { useEffect, useState } from "react";
import { getAllMilestones } from "../../modules/APIManager";
import { MilestoneCard } from "./MilestoneCard";

export const MilestoneList = () => {
  const [milestones, setMilestones] = useState([]);

  const getMilestones = () => {
    return getAllMilestones().then((milestonesFromAPI) => {
      setMilestones(milestonesFromAPI);
    });
  };

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
