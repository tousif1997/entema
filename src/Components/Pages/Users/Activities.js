import React, { useState } from 'react';
import axios from 'axios';




function Activities() {

    const [AcActivityName, setAcActivityName] = useState();
    const [AcCreatedDate, setAcCreatedDate] = useState();
    const [AcEndDate, setAcEndDate] = useState();
    const [AcDescription, setAcDescription] = useState();




    const handleChangeEvent = (e) => {
        console.log('e : ', e);
        const input = e.target.name;


        console.log('field name : ', e.target.name + '- value -', e.target.value);

        if (input === "AcActivityName") {
            setAcActivityName(e.target.value);
        } else if (input === "AcCreatedDate") {
            setAcCreatedDate(e.target.value);
        } else if (input === "AcEndDate") {
            setAcEndDate(e.target.value);
        } else if (input === "AcDescription") {
            setAcDescription(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
 
        axios.post("http://localhost:3009/insertActivitiesData", {
 
            actname:AcActivityName,
            actenddate:AcEndDate,
            actdescription:AcDescription,
            
        }).then((res) => {
            // setData(res.data);
            //  setDupData(res.data);
             console.log("result set in effect: ", res);
           });
        
        
          }


    return (
        <>
            <div class="container" style={{ paddingTop: '30px', paddingLeft: '50px' }}>
                <div className="scroll">
                    <div className="heading-layout1">
                        <div className="item-title">
                            <h3 style={{ padding: "50px" }}>Activity</h3>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} onChange={handleChangeEvent}>
                        <div className="row">
                            <div class="col-md-4 mb-3">
                                <label for="userName">Activity Name</label>
                                <input type="text" class="form-control is-valid" value={AcActivityName} id="AcActivityName" name="AcActivityName" required />
                            </div>

                        </div>

                        <div className="row">
                            <div class="col-md-4 mb-3">
                                <label for="userName">Created Date</label>
                                <input type="Date" class="form-control is-valid" value={AcCreatedDate} id="AcCreatedDate" name="AcCreatedDate" reqired />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="userName">End Date</label>
                                <input type="Date" class="form-control is-valid" value={AcEndDate} id="AcEndDate" name="AcEndDate"  />
                            </div>
                        </div>

                        <div className="row">
                            <div class="col-md-8 mb-3">
                                <label for="userFname">Description</label>
                                <textarea type="text" class="form-control is-valid" value={AcDescription} id="AcDescription" name="AcDescription" required />
                            </div>
                        </div>

                        <div>
                            <button type="submit" class="btn btn-outline-success" style={{ marginTop: "20px" }}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Activities
