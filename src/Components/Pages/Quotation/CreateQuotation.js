import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import {
  Container,
  Grid,
  Paper,
  Box,
  TextField,
  IconButton,
  Button,
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    height: "auto",
    backgroundColor: theme.palette.grey[300],
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  inputGroup: {
    minWidth: 130,
  },
}));

function CreateQuotation() {
  const classes = useStyles();

  const [cqdate, setCqdate] = useState();
  const [cqclient, setCqclient] = useState();
  const [cqname, setCqname] = useState("tetwet");
  const [cqmobileNo, setCqmobileNo] = useState();
  const [cqemail, setCqemail] = useState();
  const [termscond, settermscond] = useState("1. Above rate is applicable for 10 hours per day, 260 hours permonth. /n2. Working less than 10 hours day will be considered asfull working day. /n3. Supply Food, accommodation & sitetransportation Scope of Client. /n4. In case of non-availabilityof work or inadequate weather conditions, normal daily rate willbe charged. /n5. Payment terms will be 30 days after receipt ofthe Entema al-shamal invoice. /n6. Above Rate is Exclusive of VAT. /n7. Mobilization will be done immediately after receiving theP.O. /n8. Our quotation valid for ten days from the date of thisoffers and is subject to the availability of manpower &equipment, until receipt of the P.O. /n9. All above mentionedconditions must be mentioned in your purchase order. Hope abovequotation is made good and looking forward to get your valuablepurchase order at the earliest. Your usual Cooperation would behighly appreciated.");
  const [ischeked, setIsChecked] = useState(false);

  let newData = []; 
  let test = [];

  const ontest = () => {
    setIsChecked(!ischeked);
    setCqtypes(ischeked ? "Equipment" : "Man Power");
  };

  const [cqtypes, setCqtypes] = useState("Equipment");

  let taskList = {
    description: "",
    unit: "",
    qty: "",
    mobAnddemob: "",
    amount: "",
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3004/getMulti", {}).then((res) => {
      newData = res.data.rows;
      console.log(newData);
      var rows = [];

      for (var i = 0; i < newData.length; i++) {
        rows.push(taskList);

        test[i] = {
          description: newData[i].DESCRIPTION,
          unit: newData[i].UNIT,
          qty: newData[i].QTY,
          mobAnddemob: newData[i].UNIT_RATE,
          amount: newData[i].AMOUNT,
        };
      }
      setUsers(test);
    });
  }, []);
  const optionUnit = [
    { key: "", value: "" },
    { key: "Month", value: "Month" },
    { key: "Week", value: "Week" },
    { key: "Day", value: "Day" },
    { key: "Hour", value: "Hour" },
  ];

  const handleChangeEvent = (e, index) => {
    const input = e.target.name;

    if (input === "cqdate") {
      setCqdate(e.target.value);
    } else if (input === "cqclient") {
      setCqclient(e.target.value);
    } else if (input === "cqname") {
      setCqname(e.target.value);
    } else if (input === "cqmobileNo") {
      setCqmobileNo(e.target.value);
    } else if (input === "cqemail") {
      setCqemail(e.target.value);
    } else if (input === "cqtypes") {
      setCqtypes(e.target.value);
    } else if (input === "termscond") {
      settermscond(e.target.value);
    } else if (
      ["description", "unit", "qty", "mobAnddemob", "amount"].includes(input)
    ) {
      console.log("exceptional handling");
      changeHandler(e, index);
    }

    console.log(
      "Name : ",
      e.target.name,
      " - Value - ",
      e.target.value,
      " - dataset id - ",
      e.target
    );
    console.log("log of order Items : ", users);
  };

  const addUser = () => {
    setUsers([...users, taskList]);
  };

  const removeUsers = (index) => {
    console.log("index value :", index);
    const filteredUsers = [...users];
    filteredUsers.splice(index, 1);

    setUsers(filteredUsers);
  };

  const changeHandler = (e, index) => {
    const updatedUsers = users.map((item, i) =>
      index === i
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );
    console.log("newnew:", e.target.value);

    let test = updatedUsers.length - 1;

    if (e.target.name === "unit_rate") {
      console.log("value of quamtity :", e);
      console.log("value of quamtity bhaya :", updatedUsers[test].qty);
    }

    setUsers(updatedUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cqdate);
    console.log(cqclient);
    console.log(cqname);
    console.log(cqmobileNo);
    console.log(cqemail);
    console.log(cqtypes);
    console.log(termscond);
    console.log("multirow  data :", users);
  };

  return (
    <>
      <div class="scrollbar square scrollbar-lady-lips thin">
        <div
          class="container"
          style={{ paddingTop: "30px", paddingLeft: "50px" }}
        >
          <div className="row">
            <div className="col-sm-6 left1">
              <div className="top-detail1">
                <img
                  src="logo2.jpg"
                  style={{
                    width: "360px",
                    height: "100px",
                    marginLeft: "-82px",
                  }}
                  alt="logo"
                />
                <p>
                  Al-Jubail St P.O. Box 2816, Jubail 31951, Saudi Arabia
                  <br />
                  <strong>Phone:</strong> 013 363 1210
                  <br />
                  <strong>Email:</strong> info@entema-sa.com
                  <br />
                  <strong>VAT No:</strong> 310005823700003
                </p>
              </div>
            </div>
            <div className="top-quot2" style={{ marginLeft: "157px" }}>
              <div className="  qt-left">Date : Jun 14, 2021</div>
              <div className=" qt-left">Quot# : ENT/Jun-21/111</div>
            </div>
          </div>
          <div className="heading-layout1">
            <div className="item-title">
              <h4 style={{ color: "blue" }}>Work Schedule</h4>
            </div>
          </div>
          <div className="row">
            <div class="col-md-4 mb-3">
              <label for="cqdate" style={{ marginLeft: "0px" }}>
                Start Date
              </label>
              <input
                type="date"
                class="form-control is-valid"
                id="cqdate"
                name="cqdate"
                value={cqdate}
                onChange={(e) => handleChangeEvent(e)}
              />
            </div>
            <div className="top-quot2" style={{ marginLeft: "337px" }}>
              <div className="  qt-left">From : Entemasw</div>
              <div className=" qt-left">User Mobile No : 0559258940</div>
            </div>
          </div>
          <div className="heading-layout1">
            <div className="item-title">
              <h4 style={{ color: "blue" }}>Company</h4>
            </div>
          </div>
          <form onSubmit={handleSubmit} onChange={handleChangeEvent}>
            <div className="row">
              {" "}
              <div class="col-md-6 mb-3">
                <label for="cqclient">Client</label>
                <select
                  class="form-control is-valid"
                  id="cqclient"
                  name="cqclient"
                  value={cqclient}
                >
                  <option value="DEFAULT">Select Client</option>
                  <option value="1">Zeeshan</option>
                  <option value="2">shabaz</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="cqname">Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="cqname"
                  name="cqname"
                  value={cqname}
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="cqmobileNo">Mobile No</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="cqmobileNo"
                  name="cqmobileNo"
                  value={cqmobileNo}
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="cqemail">Email</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="cqemail"
                  name="cqemail"
                  value={cqemail}
                />
              </div>
              <div className="centre">
                <h6 style={{ marginLeft: "50px" }}>
                  With reference to the above subject we are very much
                  interested to supply and Hereby Quote our best reasonable
                  price for the same.
                </h6>
              </div>
            </div>
            Equipment
            <Switch
              onChange={ontest}
              color="primary"
              name="checkedB"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            Man Power
            <div className="heading-layout1">
              <div className="item-title">
                <h4 style={{ color: "blue" }}>Terms & Conditions:</h4>
              </div>
            </div>
            <Container className={classes.root}>
              <Paper component={Box} p={4}>
                {users.map((item, index) => (
                  <Grid
                    container
                    spacing={3}
                    key={index}
                    className={classes.inputGroup}
                  >
                    <Grid item md={3}>
                      <TextField
                        label="Description"
                        name="description"
                        type="textarea"
                        placeholder="Description"
                        variant="outlined"
                        value={item.description}
                        key={index}
                        onChange={(e) => handleChangeEvent(e, index)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={3}>
                      <FormControl
                        variant="outlined"
                        className={classes.inputGroup}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Unit
                        </InputLabel>
                        <Select
                          native
                          value={item.unit}
                          onChange={(e) => handleChangeEvent(e, index)}
                          label="unit"
                          id="unit"
                          inputProps={{
                            name: "unit",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          {optionUnit.map((optionGender) => {
                            return (
                              <option
                                key={optionGender.key}
                                value={optionGender.value}
                              >
                                {optionGender.key}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item md={2}>
                      <TextField
                        label="Qty"
                        name="qty"
                        //placeholder="Enter Your address"
                        variant="outlined"
                        value={item.qty}
                        onChange={(e) => handleChangeEvent(e, index)}
                        fullWidth
                      />
                    </Grid>

                    {ischeked ? (
                      <Grid item md={3}>
                        <TextField
                          label="Mobilization And Demobilization"
                          name="mobAnddemob"
                          variant="outlined"
                          value={item.mobAnddemob}
                          onChange={(e) => handleChangeEvent(e, index)}
                          fullWidth
                        />
                      </Grid>
                    ) : (
                      <Grid item md={3}>
                        <TextField
                          type="text"
                          label="Amount"
                          name="amount"
                          //placeholder="Enter Your address"
                          variant="outlined"
                          value={item.amount}
                          onChange={(e) => handleChangeEvent(e, index)}
                          fullWidth
                        />
                      </Grid>
                    )}

                    <Grid item md={1}>
                      <IconButton color="secondary">
                        <DeleteOutlineIcon onClick={() => removeUsers(index)} />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addUser}
                  style={{ marginTop: "10px" }}
                >
                  Add More
                </Button>
              </Paper>
            </Container>
            <div class="col-md-12 mb-3">
              <label for="termscond">Terms & Conditions</label>
              <textarea
                type="text"
                className="form-control is-valid textarea"
                name={termscond}
              >
              </textarea>
              <h6 style={{ marginTop: "10px" }}>
                Client has to return the same Quotation to Entema Al-shamal by
                Fax or Email after Confirmation Signature.
              </h6>
            </div>
            <div className="col-sm-12">
              <div className="bot-cl">
                <div className="heading-layout1">
                  <div className="item-title">
                    <h4 style={{ color: "blue" }}>Client Acceptance</h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="bot-cl2">
                      <div className="row">
                        <div className="col-sm-4 col-xs-4 bot-left">Name</div>
                        <div className="col-sm-8 col-xs-8 bot-right"></div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4 col-xs-4 bot-left">Title</div>
                        <div className="col-sm-8 col-xs-8 bot-right"></div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4 col-xs-4 bot-left">Date</div>
                        <div className="col-sm-8 col-xs-8 bot-right"></div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4 col-xs-4 bot-left">
                          Signature
                        </div>
                        <div className="col-sm-8 col-xs-8 bot-right"></div>
                      </div>
                    </div>
                  </div>
                  <input
                    type="hidden"
                    name="type"
                    id="quot-type"
                    value="equipment"
                  />
                  <input type="hidden" name="unit" value="month" />
                  <input type="hidden" name="user_id" value="4" />

                  <div className="col-sm-6">
                    <div className="bot-cl3">
                      <h4>For Entema Al Shamal Gen. cont. Est</h4>
                      <div className="bot-in">Entemasw , Manager </div>
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="save" style={{ marginLeft: "800px" }}>
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateQuotation;