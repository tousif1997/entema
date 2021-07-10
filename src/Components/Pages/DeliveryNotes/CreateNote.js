import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";




function CreateNote() {
    const history = useHistory();

    const [DnClient, setDnClient] = useState();
    const [DnAddress, setDnAddress] = useState();
    const [DnShippingAddress, setDnShippingAddress] = useState();
    const [DnOrderDate, setDnOrderDate] = useState();
    const [DnDispatchDate, setDnDispatchDate] = useState();
    const [DnNotice, setDnNotice] = useState();


    const handleChangeEvent = (e) => {
        console.log('e : ', e);
        const input = e.target.name;

        console.log('field name : ', e.target.name + '- value -', e.target.value);

        if (input === "DnClient") {
            setDnClient(e.target.value);
        } else if (input === "DnAddress") {
            setDnAddress(e.target.value);
        } else if (input === "DnShippingAddress") {
            setDnShippingAddress(e.target.value);
        } else if (input === "DnOrderDate") {
            setDnOrderDate(e.target.value);
        } else if (input === "DnDispatchDate") {
            setDnDispatchDate(e.target.value);
        } else if (input === "DnNotice") {
            setDnNotice(e.target.value);
        }

    };
    const handleSubmit = (e) => {
        e.preventDefault();
 
        axios.post("http://localhost:3009/insertDeliveryNoteData", {
 
            delclient:DnClient,
            deladd:DnAddress,
            delshipadd:DnShippingAddress,
            delorderdate:DnOrderDate,
            deldispdate:DnDispatchDate,
            delnotice:DnNotice,
 
        })
        .then((res) => {
            history.push("/");
          console.log("updated Values Successfully : ", res.data);
        });
 
        console.log('test submit');
    }


    return (
        <>
            <div class="scrollbar square scrollbar-lady-lips thin">
                <div class="container" style={{ paddingTop: '30px', paddingLeft: '50px' }}>

                    <div className="heading-layout1">
                        <div className="item-title">
                            <h3 style={{ padding: "50px" }}>Add Delivery Note</h3>
                        </div>
                    </div>
                    <form onChange={handleChangeEvent} onSubmit={handleSubmit}>
                        <div className="row">
                            <div class="col-md-6 mb-3">
                                <label for="userName">Client</label>
                                <select class="form-control is-valid" value={DnClient} id="DnClient" name="DnClient" required>
                                    <option value="">Client Name</option>
                                    <option value="1">Zeeshan</option>
                                    <option value="2">shabaz</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-md-6 mb-3">
                                <label for="userFname">Address</label>
                                <textarea type="text" class="form-control is-valid" value={DnAddress} id="DnAddress" name="DnAddress" required />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="userFname">Shipping Address</label>
                                <textarea type="text" class="form-control is-valid" value={DnShippingAddress} id="DnShippingAddress" name="DnShippingAddress" required />
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-md-6 mb-3">
                                <label for="userName">Order Date</label>
                                <input type="Date" class="form-control is-valid" value={DnOrderDate} id="DnOrderDate" name="DnOrderDate" required />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="userName">Dispatch Date</label>
                                <input type="Date" class="form-control is-valid" value={DnDispatchDate} id="DnDispatchDate" name="DnDispatchDate" required />
                            </div>

                        </div>

                        <div className="row">
                            <div class="col-md-9 mb-3">
                                <label for="userFname">Notice</label>
                                <textarea type="text" class="form-control is-valid" value={DnNotice} id="DnNotice" name="DnNotice" required />
                            </div>
                        </div>
                        <div>

                            <button type="submit" class="btn btn-outline-success">Submit</button>
                        </div>
                    </form>
                </div></div>
        </>
    )
}

export default CreateNote