import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers`

const DeleteCustomer = (props) => {
  console.log(props)
  const id = (props.info.id);
  
  const handleDelete = async () => {
  const customerURL = `${URL}/${id}`;
  const res = await axios.delete(customerURL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_KEY}`,
      },
  });
    console.log(res);
    props.fetchData()
  };
  
  return (
        <div key={props.info.id}>
          <Link to={`/customers/${props.info.id}`} >
          <h3>{props.info.fields.name_company}</h3>
              <img src={props.info.fields.company_logo} alt={props.info.fields.name_company} />
              </Link>
            <p>Address: {props.info.fields.address}, {props.info.fields.state}, {props.info.fields.country}</p>
            <p>Account Manager: {props.info.fields.account_manager}</p>
            <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default DeleteCustomer