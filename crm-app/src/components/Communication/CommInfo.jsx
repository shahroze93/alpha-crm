import "./Communication.css"
import axios from "axios";
import { Link } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/communication`;

function CommInfo(props) {
  const id = (props.info.id);
  // console.log(id)
  
  const handleDelete = async () => {
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
    <div key={props.info.id}>
        <h4>Person Contacted: {props.info.fields.name_contact}</h4>
        <Link to={`/customers/${props.info.fields.name_company}`} ><p>{props.info.fields.name_company_customers}</p></Link>  
        <p>Method of Contact: {props.info.fields.contact_method}</p>
        <p>Topic of Discussion: {props.info.fields.topic_discussed}</p>
        <p>Expected Revenue: ${props.info.fields.expected_revenue}</p>
        <label className="commHeader" >Notes:</label>
        <p>{props.info.fields.notes}</p>
        <p>posted: {props.info.createdTime}</p>
      <button onClick={handleDelete}>Delete Communication</button>
      <br />
      <Link to={`/editComm/${props.info.id}`}>EDIT COMMUNICATION</Link>
  </div>
  )
}

export default CommInfo;