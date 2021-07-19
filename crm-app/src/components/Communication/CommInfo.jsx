import "./Communication.css"
import axios from "axios";
import { Link } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/communication`;

function CommInfo(props) {
  const id = (props.info.id);
  
  const handleDelete = () => {
    let entry = prompt("Please enter passcode to confirm DELETE:", "");
    if (entry === null || entry === "") {
      alert("NO INPUT - DELETION CANCELLED")
    } else if (entry === "deleteconfirm") {
      alert("DELETION COMPLETE")
      handleDelete2();
    } else {
      alert("INCORRECT PASSCODE - TRY AGAIN TO CONFIRM")
    }
  }

  const handleDelete2 = async () => {
    const communicationURL = `${URL}/${id}`;
    const res = await axios.delete(communicationURL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_KEY}`,
      },
    });
    console.log(res);
    if (props.fetchData) {
      props.fetchData() // for All communication page refreshing
    }
    if (props.fetchCustomer) {
      props.fetchCustomer() // for CustomerDetail page refreshing
    }
  };
  
  return (
    <div className="contactCard" key={props.info.id}>
      <h2>Contact: {props.info.fields.name_contact} &bull; <Link className="commLinks" to={`/customers/${props.info.fields.name_company}`} >{props.info.fields.name_company_customers}</Link></h2>
      <p><label className="commHeader" >Method of Contact:</label> {props.info.fields.contact_method}</p>
      <p><label className="commHeader" >Topic of Discussion:</label> {props.info.fields.topic_discussed}</p>
      <p><label className="commHeader" >Expected Revenue:</label> ${props.info.fields.expected_revenue}</p>
      <label className="commHeader" >Notes:</label>
      <p>{props.info.fields.notes}</p>
      <p><label className="commHeader" >Posted: </label>{props.info.createdTime}</p>
      <button className="deleteCommButton" onClick={handleDelete}>DELETE</button>
      <Link className="editCommButton" to={`/editComm/${props.info.id}`}>EDIT</Link>
  </div>
  )
}

export default CommInfo;