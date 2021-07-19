import "./Customers.css"
import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers`

const DeleteCustomer = (props) => {
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
  const customerURL = `${URL}/${id}`;
  await axios.delete(customerURL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_KEY}`,
      },
  });
    props.fetchData()
  };

  return (
    <section className='customerBox' key={props.info.id}>
    <div className="customerBoxImg" >        
      <Link className="customerLink" to={`/customers/${props.info.id}`} >
        <h2 className="customerName" >{props.info.fields.name_company}</h2>
        <img className="logos" src={props.info.fields.company_logo} alt={props.info.fields.name_company} />
      </Link>
    </div>
    <div className="customerBoxData">
      <p>Address: {props.info.fields.address}, {props.info.fields.state}, {props.info.fields.country}</p>
      <p>Account Manager: {props.info.fields.account_manager}</p>
      <p>Status: <strong>{props.info.fields.status}</strong></p>  
    </div>
    <div className="customerBoxDelete" >
      <button className="deleteButton" onClick={handleDelete}>DELETE</button>
    </div>
    </section>
  )
}

export default DeleteCustomer
