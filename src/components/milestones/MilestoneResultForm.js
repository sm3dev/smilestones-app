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

    const handleValidatedTrueFalse = (stringAnswer) => {
        let result;
        if (stringAnswer == "true") {
          result = true;
        } else {
          result = false;
        }
        return result
      };

    const handleControlledInputChange = (event) => {
        const newMilestoneResult = { ...milestoneResult };
        let selectedVal = event.target.value;

        // forms always provide values as strings. But we want to save the ids as numbers.
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal);
        }

        if (event.target.id.includes("alidated")) {
            selectedVal = handleValidatedTrueFalse(event.target.value);
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

    return (
        <>
            <h1>New Milestone Achievement</h1>
            <h2>Milestone: {thisMilestone.name}</h2>
            <h4>Type: {thisMilestone.milestoneType?.name}</h4>
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
                    <label htmlFor="quantity">How Many:</label>
                    <input id="quantity" type="number" value={milestoneResult.quantity} onChange={handleControlledInputChange} />
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
                    <fieldset className="form-group">
                        <legend>Validated:</legend>
                        <label htmlFor="validated">
                            {/* <em>coming soon</em> */}
                            </label>
                        {milestoneResult.validated === true ? (
                    <>
                        <label htmlFor="validated">Yes: </label>
                        <input onChange={handleControlledInputChange} id="yesValidated" name="validated" type="radio" value="true" checked />
                        
                        <label htmlFor="validated">No: </label>
                        <input onChange={handleControlledInputChange} id="noValidated" name="validated" type="radio" value="false" />
                    </>
                ) : (
                    <>
                        <label htmlFor="validated">Yes: </label>
                        <input onChange={handleControlledInputChange} id="validated" name="validated" type="radio" value="true" />
                        
                        <label htmlFor="validated">No: </label>
                        <input onChange={handleControlledInputChange} id="validated" name="validated" type="radio" value="false" checked/>
                    </>

                )
                }
                    </fieldset>
                </div>
                
                <div className="form-group">
                    <label htmlFor=""></label>
                </div>
                
            </form>
        </>
    )
}
