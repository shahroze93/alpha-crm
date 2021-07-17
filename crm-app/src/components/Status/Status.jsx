import "./Status.css"
import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;
const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers`;

const Status = (props) => {
  const [customer, setCustomer] = useState([])
  const { id } = useParams();

  let progress = [
    { label: "Open", value: "Open" },
    { label: "On-going", value: "On-going" },
    { label: "Closed", value: "Closed" },
    { label: "Delay", value: "Delay" },
    { label: "Pending", value: "Pending" },
    { label: "New", value: "New" },
]

useEffect(() => {
  fetchCustomer();
}, []);
const fetchCustomer = async () => {
  const customerURL = `${URL}/${id}`;
  const res = await axios.get(customerURL, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_KEY}`,
    },
  });
  // console.log(res.data.fields)
  setCustomer(res.data.fields);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };
  
const handleUpdate = async (e) => {
  e.preventDefault();
  const customerURL = `${URL}/${id}`;
  const res = await axios.put(
    customerURL,
    { fields: customer },
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_KEY}`,
      },
    }
  );
  console.log(res);
  props.fetchCustomer();
};

return (
  <div className="statusShow">
  <h1>Progress Status</h1>
  <p>Update by selecting from below</p>
  <form onSubmit={handleUpdate}>
    <select name="status" className="selectOption" onChange={handleChange}>
    <option value={customer.status}>{customer.status}</option>
    {progress.map((progress, index) => <option key={index} name="status" value={progress.value}>{progress.label}</option>)}</select>
    <br />
    <button className="submitStatus" >UPDATE</button>
    </form>
  </div>
  )
}
export default Status
