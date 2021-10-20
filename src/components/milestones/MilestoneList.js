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
      <div>
          {milestones.map(milestone => <MilestoneCard key={milestone.id} milestone={milestone} />) }
      </div>
      </>
  );
};
