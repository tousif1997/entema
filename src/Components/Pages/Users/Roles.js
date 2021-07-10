import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 690,
        maxWidth: 700,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function Roles() {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [personName, setPersonName] = React.useState([]);
    const [RoRolesName, setRoRolesName] = useState();
    const [RoCreatedDate, setRoCreatedDate] = useState();
    const [RoEndDate, setRoEndDate] = useState();
    const [RoDescription, setRoDescription] = useState();




    const handleChangeEvent = (e) => {
        console.log('e : ', e);
        const input = e.target.name;


        console.log('field name : ', e.target.name + '- value -', e.target.value);

        if (input === "RoRolesName") {
            setRoRolesName(e.target.value);
        } else if (input === "RoCreatedDate") {
            setRoCreatedDate(e.target.value);
        } else if (input === "RoEndDate") {
            setRoEndDate(e.target.value);
        } else if (input === "RoDescription") {
            setRoDescription(e.target.value);
        } else if (input === "personName") {
            setPersonName(e.target.value);
        }
    };

    useEffect(() => {
        setRoCreatedDate(setDateFormat());
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
 
        axios.post("http://localhost:3009/insertRolesData", {
 
            rlname:RoRolesName,
            rlenddate:RoEndDate,
            rldescription:RoDescription,
            
        }).then((res) => {
            // setData(res.data);
            //  setDupData(res.data);
            history.push("/");
             console.log("result set in effect: ", res);
           });
        
        
          }

          const setDateFormat = ()=> {
            let currentDate = new Date();
            let currentYear = new Intl.DateTimeFormat("en", { year: "numeric" }).format(currentDate);
            let currentMonth = new Intl.DateTimeFormat("en", {month: "numeric",}).format(currentDate);
            let currentDay = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(currentDate);
            
            console.log(`${currentDay}-${currentMonth}-${currentYear}`);
        
            // let formatedDate = currentDay + "-0" + currentMonth + "-" + currentYear;
     
            let formatedDate;
     
            if (currentMonth in [1,2,3,4,5,6,7,8,9]){
                formatedDate = currentYear + "-0" + currentMonth + "-" + currentDay;
            }else{
                formatedDate = currentYear + "-" + currentMonth + "-" + currentDay;
            }
     
            return formatedDate;
        }

    return (
        <>
            <div class="container" style={{ paddingTop: '30px', paddingLeft: '50px' }}>
                <div className="scroll">
                    <div className="heading-layout1">
                        <div className="item-title">
                            <h3 style={{ padding: "50px" }}>Roles</h3>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} onChange={handleChangeEvent}>
                        <div className="row">
                            <div class="col-md-4 mb-3">
                                <label for="userName">Roles Name</label>
                                <input type="text" class="form-control is-valid" value={RoRolesName} id="RoRolesName" name="RoRolesName" required />
                            </div>

                        </div>

                        <div className="row">
                            <div class="col-md-4 mb-3">
                                <label for="userName">Created Date</label>
                                <input type="Date" class="form-control is-valid" value={RoCreatedDate} id="RoCreatedDate" name="RoCreatedDate" disabled />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="userName">End Date</label>
                                <input type="Date" class="form-control is-valid" value={RoEndDate} id="RoEndDate" name="RoEndDate"  />
                            </div>
                        </div>

                        <div className="row">
                            <div class="col-md-8 mb-3">
                                <label for="userFname">Description</label>
                                <textarea type="text" class="form-control is-valid" value={RoDescription} id="RoDescription" name="RoDescription" required />
                            </div>
                        </div>

                        <FormControl className={classes.formControl}>
                            <label id="demo-mutiple-chip-label">Roles</label>
                            <Select  style={{borderStyle:"groove",borderRadius:"5px",borderColor:"#a2e0a2",backgroundColor:"white",marginTop:"0px"}}
                                labelId="demo-mutiple-chip-label"
                                id="personName"
                                name="personName"
                                multiple
                                value={personName}
                                onChange={handleChangeEvent}
                                input={<Input id="select-multiple-chip" />}
                                required
                                renderValue={(selected) => (
                                    <div className="demo-mutiple-chip-label">
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip}/>
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <div>
                            <button type="submit" class="btn btn-outline-success" style={{ marginTop: "20px", marginBottom: "20px" }}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}