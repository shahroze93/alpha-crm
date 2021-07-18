import "./Contacts.css"
import axios from "axios";
import { Link } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts`;

function ContactInfo(props) {
  // console.log(props)
  const id = (props.info.id);
  // console.log(id)
  
  // took assistance from: https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm
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
    const contactURL = `${URL}/${id}`;
    const res = await axios.delete(contactURL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_KEY}`,
      },
    });
    console.log(res);
    if (props.fetchData) {
      props.fetchData() // for All contacts page refreshing
    }
    if (props.fetchCustomer) {
      props.fetchCustomer() // for CustomerDetail page refreshing
    }
  };

  return (
    <div className="contactCard" key={props.info.id}>
        <Link className="companyNameHeader" to={`/customers/${props.info.fields.name_company}`} ><h3>{props.info.fields.name_company_customers}</h3></Link>
        <h3>{props.info.fields?.name_contact}</h3>
        <label>Designation / Position: </label>
        <p>{props.info.fields?.designation}</p>
        <label>Phone:</label>  
        <p>{props.info.fields?.phone}</p>
        <label>Email:</label>
        <p>{props.info.fields?.email}</p>
      <button className="deleteContactButton" onClick={handleDelete}>DELETE</button>
      <Link className="editContactButton" to={`/editContact/${props.info.id}`}>EDIT</Link>
    </div>
  )
}

export default ContactInfo;


