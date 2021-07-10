import React, { useEffect, useState } from 'react'
import './Adduser.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
import { useHistory } from "react-router-dom";

function Adduser(props) {

    const history = useHistory();

    const [ userName, setUserName] = useState();
    const [ userFname, setUserFname] = useState();
    const [ userEmail, setUserEmail] = useState();
    const [ userPwd, setUserPwd] = useState();
    const [ userCpwd, setUserCpwd] = useState();
    const [ userPhone, setUserPhone] = useState();
    const [ userDesignation, setUserDesignation] = useState();
    const [ userRole, setUserRole] = useState();
    const [ userStatus, setUserStatus] = useState();
    const [ userActdate, setUserActdate] = useState();
    const [ userDactdate, setUserDactdate] = useState();

    const [ showForm, setShowForm] = useState(true);

    const [ roleLov, setRoleLov] = useState([]);


    if (props.formAccess === false){
        setShowForm(false);
    } 

    const statusLov = [
        {key : "", value:"Select Status"},
        {key : "1", value:"Active"},
        {key : "2", value:"Inactive"}
    ]


    const getRoleLovData = () => {
        fetch("http://localhost:3009/getRolesData", {
            method : 'Get',
            headers:{
                'Content-Type':'application/json',
                    }
        }).then(response => response.json())
        .then(response => {setRoleLov(response);
        console.log('My API data : ',response);
        });
       return roleLov; 
    } 

    useEffect(() => {
        getRoleLovData();
    },[]);
    
    const handleSubmit = (event) => {
        console.log('event : ',event.target[0].id);
        console.log('event : ',event.target[0].value);
        // event.preventDefault();

        if ( userPwd == userCpwd){
            // alert('Hello');
            
            Axios.post("http://localhost:3009/insertUserData", {
                userName  : userName,
                userFname : userFname,
                userEmail : userEmail,
                userPwd : userPwd,
                userCpwd : userCpwd,
                userPhone : userPhone,
                userDesignation : userDesignation,
                userRole : userRole,
                userStatus : userStatus,
                userActdate : userActdate,
                userDactdate : userDactdate,
               }).then((res) => {
                 console.log("result set in effect: ", res);
                //  history.push("/");
                // handleReset();
               });

               history.push("/");

        }else if ( userPwd != userCpwd){
            alert('your password are not Identical');
            return false;
        }

    }

  

    const handleChangeEvent = (e) => {
        console.log('e.target.name : ', e.target.value);
        // return (e.target.name = e.target.value);
       
        const input = e.target.name

        if(input == "userName"){
            setUserName(e.target.value)
        } else if(input === "userFname"){
            setUserFname(e.target.value)
        } else if(input === "userEmail"){
            setUserEmail(e.target.value)
        } else if(input === "userPwd"){
            setUserPwd(e.target.value)
        } else if(input === "userCpwd"){
            setUserCpwd(e.target.value)
        } else if(input === "userPhone"){
            setUserPhone(e.target.value)
        } else if(input === "userDesignation"){
            setUserDesignation(e.target.value)
        } else if(input === "userRole"){
            setUserRole(e.target.value)
        } else if(input === "userStatus"){
            setUserStatus(e.target.value)
        } else if(input === "userActdate"){
            setUserActdate(e.target.value)
        } else if(input === "userDactdate"){
            setUserDactdate(e.target.value)
        }
    }

    return (
        <>
            <div class="container" style={{ paddingTop: '30px', paddingLeft: '50px' }}>
    <div>
                <div className="heading-layout1">
                    <div className="item-title">
                        <h3 style={{ padding: "50px" }}>Add User</h3>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userName">User name</label>
                            <input type="text" class="form-control is-valid" id="userName" name="userName" onChange={handleChangeEvent} required/>
                        </div>

                        <div class="col-md-4 mb-3">
                            <label htmlFor="userFname">Full Name</label>
                            <input type="text" class="form-control is-valid" id="userFname" name="userFname" onChange={handleChangeEvent} required/>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userEmail">User Email</label>
                            <input type="text" class="form-control is-valid" id="userEmail" name="userEmail" onChange={handleChangeEvent} required/>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userPwd">Password</label>
                            <input type="password" class="form-control is-valid" id="userPwd" name="userPwd" onChange={handleChangeEvent} required />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userCpwd">Confirm Password</label>
                            <input type="password" class="form-control is-valid" id="userCpwd" name="userCpwd" onChange={handleChangeEvent} required />  
                        </div>
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userPhone">Phone</label>
                            <input type="text" class="form-control is-valid" id="userPhone" name="userPhone" onChange={handleChangeEvent} required />
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userDesignation">Designation</label>
                            <input type="text" class="form-control is-valid" id="userDesignation" name="userDesignation" onChange={handleChangeEvent} required />
                        </div>
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userRole">Role</label>
                            <select class="form-control is-valid" id="userRole" name="userRole" onChange={handleChangeEvent} required>
                            <option key="" value="">Select Role</option>
                            {roleLov.map((data) => <option key={data.RL_ID} value={data.RL_ID}>{data.RL_NAME}</option>)} 
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label htmlFor="userStatus">Status</label>
                            <select class="form-control is-valid" id="userStatus" name="userStatus" onChange={handleChangeEvent} required>
                                <option value="">select Status</option>
                                {statusLov.map((data) => <option key={data.key} value={data.key}>{data.value}</option>)} 
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div class="col-md-4 mb-3">

                            <label htmlFor="userActdate">Activation Date</label>
                            <input type="date" class="form-control is-valid" id="userActdate" name="userActdate" onChange={handleChangeEvent} required />
                        </div>
                        <div class="col-md-4 mb-3">

                            <label htmlFor="userDactdate">Deactivation Date</label>
                            <input type="date" class="form-control is-valid" id="userDactdate" name="userDactdate" onChange={handleChangeEvent} required />
                        </div>
                    </div>
                    <div>

                        <button type="submit" class="btn btn-outline-success">Submit</button>
                    </div>
                </form> 
    </div>

</div>

        </>
    )
}

export default Adduser
