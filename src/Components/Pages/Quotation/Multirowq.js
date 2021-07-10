import React, {useState} from "react";

const Multirow = (props) => {
const [counter, setCounter] = useState(1)



  return props.taskList.map((val, idx) => {
    let
    description = `description-${idx}`,
    qty = `qty-${idx}`,
    unit = `unit-${idx}`,
    mobilizationdemobilization=`mobilizationdemobilization-${idx}`,
    totalamountsar = `totalamountsar-${idx}`;
      
    return (
      <tr key={val.index}>
<td>{idx + 1}</td>
      <td>
      <textarea  name="description" id={description} data-id={idx} className="form-control is-valid"></textarea>
    </td>

    <td>
       <div
            className="col-xl-10 col-lg-6 col-12 ">
            <input type="text" class="form-control is-valid"  data-id={idx}
            id={qty} required />
            
            </div>
       </td>
       <td>
         
          
       <div className="col-xl-10 col-lg-10 col-18 ">
       

       
         <select
           className="form-control is-valid"
           name="unit"
           data-id={idx}
           id={unit}
           style={{width:'108px'}}
         >
           <option value="" data-select2-id="">
             Select
           </option>
           <option value="1" data-select2-id="20">
           Month
           </option>
           <option value="2" data-select2-id="21">
             Week
           </option>
           <option value="3" data-select2-id="22">
             Day
           </option>
           <option value="3" data-select2-id="22">
             Hour
           </option>
           
         </select>
       </div>
       
     </td>
        
        <td>
          <input
            type="text"
            name="mobilizationdemobilization"
            data-id={idx}
            id={mobilizationdemobilization
        }
            className="form-control is-valid "
          />
        </td>
        <td>
        <input
          type="text"
          name="totalamountsar"
          data-id={idx}
          id={totalamountsar
      }
          className="form-control is-valid"
        />
      </td>

        <td>
          {idx === 0 ? (
            <button
              onClick={() => {props.add(); setCounter(counter+1);}}
              type="button"
              className="btn btn-primary text-center"
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => props.delete(val)}
            >
              <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
          )}
        </td>
      </tr>
    );
  });
};
export default Multirow;
