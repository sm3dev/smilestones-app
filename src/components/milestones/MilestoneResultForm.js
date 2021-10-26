import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { addNewUserMilestone, getMilestoneByID } from '../../modules/APIManager';

export const MilestoneResultForm = () => {
    const currentUserId = parseInt(sessionStorage.getItem("smilestones_user"));
    
    const [milestoneResult, setMilestoneResult] = useState({
    milestoneId: useParams().milestoneId,
    userId: currentUserId,
    date: "",
    validated: false,
    timeToComplete: 0,
    distance: 0,
    quantity: 0,
    remarks: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const [thisMilestone, setThisMilestone] = useState({
        milestoneTypeId: 0,
        description: "",
        name: "",
        repeater: false,
    })

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newMilestoneResult = { ...milestoneResult };
        let selectedVal = event.target.value;

        // forms always provide values as strings. But we want to save the ids as numbers.
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal);
        }

        // set the property to the new value
        newMilestoneResult[event.target.id] = selectedVal;

        // update states
        setMilestoneResult(newMilestoneResult);
    }

    const getMilestoneData = () => {
        getMilestoneByID(milestoneResult.milestoneId).then(milestoneFromAPI => {
            setThisMilestone(milestoneFromAPI);
        })
    }

    useEffect(() => {
        getMilestoneData();
        setIsLoading(false)
    }, [])

    const handleClickSaveTask = (event) => {
        event.preventDefault();
        setIsLoading(true);

        addNewUserMilestone(milestoneResult).then(() => history.push(`/achievements`))
    }

    // ROADBLOCK: I need to get the Milestone data, so I can show it in this Milestone Result Form: milestones.id, milestones.name, and milestones.milestoneTypeId.
    // I can't figure out how to use the getMilestoneByID fetch inside of this JS.
    // I know that I can get the Milestone ID from the Milestone Card in the list, because in the MilestoneCard, I was able to use the Milestone ID in a Link to open a custom Route for the view of this form.
    // In order to write the condition statements that control with measurement input field is displayed, I need to use the MilestoneType that comes from the getMilestoneByID fetch. I have to use getMilestoneByID here. 

    // milestoneId: 0,
    // userId: 0,
    // date: "",
    // validated: false,
    // timeToComplete: 0,
    // distance: 0,
    // quantity: 0,
    // remarks: ""
    return (
        <>
            <h1>New Milestone Result</h1>
            <h3>Milestone Title: {thisMilestone.name}</h3>
            <div>Milestone Type: {thisMilestone.milestoneType?.name}</div>
            <form>
                <div className="form-group">
                    <input
                        value={milestoneResult.userId}
                        id="user"
                        type="hidden"
                        onChange={handleControlledInputChange}
                    />
                </div>
                
                {thisMilestone.milestoneType?.id === 1 ? (
                    <>
                    <div className="form-group">
                    <label htmlFor="timeToComplete">Your Time:</label>
                    <input value={milestoneResult.timeToComplete} id="timeToComplete" type="text" onChange={handleControlledInputChange} />
                    </div>
                    <div className="form-group">
                    {/* STRETCH: Do not allow a future date to be input */}
                    <label htmlFor="date">Date Milestone Achieved:</label>
                    <input required id="date" name="date" type="date" onChange={handleControlledInputChange} value={milestoneResult.date} />
                    </div>
                    </>
                ) : thisMilestone.milestoneType?.id === 2 ? (
                <>
                <div className="form-group">
                    <label htmlFor="distance">Distance/Length:</label>
                    <input id="distance" type="text" value={milestoneResult.distance} onChange={handleControlledInputChange} />
                </div>
                <div className="form-group">
                    {/* STRETCH: Do not allow a future date to be input */}
                    <label htmlFor="date">Date Milestone Achieved:</label>
                    <input required id="date" name="date" type="date" onChange={handleControlledInputChange} value={milestoneResult.date} />
                    </div>
                </>
                ) : thisMilestone.milestoneType?.id === 3 ? (
                    <>
                    <div className="form-group">
                    <label htmlFor="height">Height:</label>
                    <input id="height" type="text" value={milestoneResult.distance} onChange={handleControlledInputChange} />
                    </div>
                    <div className="form-group">
                    {/* STRETCH: Do not allow a future date to be input */}
                    <label htmlFor="date">Date Milestone Achieved:</label>
                    <input required id="date" name="date" type="date" onChange={handleControlledInputChange} value={milestoneResult.date} />
                    </div>
                    
                    </>
                ) : thisMilestone.milestoneType?.id === 4 ? (
                    <>
                    <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input id="quantity" type="text" value={milestoneResult.quantity} onChange={handleControlledInputChange} />
                    </div>
                    <div className="form-group">
                    {/* STRETCH: Do not allow a future date to be input */}
                    <label htmlFor="date">Date Milestone Achieved:</label>
                    <input required id="date" name="date" type="date" onChange={handleControlledInputChange} value={milestoneResult.date} />
                    </div>
                    </>
                ) : (
                    <>
                    <div className="form-group">
                    {/* STRETCH: Do not allow a future date to be input */}
                    <label htmlFor="date">Achievement Date:</label>
                    <input required id="date" name="date" type="date" onChange={handleControlledInputChange} value={milestoneResult.date} />
                    </div>
                    </>
                )
                }
                <div className="form-group">
                    <label htmlFor="remarks">Remarks:</label>
                    <textarea onChange={handleControlledInputChange} name="remarks" id="remarks" cols="30" rows="10"></textarea>
                </div>
                <button onClick={handleClickSaveTask} disabled={isLoading} className="milestoneResult save__button">Save Achievement</button>
                <Link to="/milestones"><button>Cancel</button></Link>
                <div>
                    <h4>More About This Milestone</h4>
                    <div className="form-group">
                        <p>{thisMilestone.description}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="validated">Validated: </label>
                        <input onChange={handleControlledInputChange} id="validated" type="checkbox" value={milestoneResult.validated} />
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor=""></label>
                </div>
                
            </form>
        </>
    )
}
