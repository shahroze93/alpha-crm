import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
  
const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers?api_key=${AIRTABLE_KEY}`

function CustomerList() {
  // console.log(URL)
  // console.log(AIRTABLE_KEY, AIRTABLE_BASE);
  const [customers, setCustomers] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    console.log(res.data.records);
    setCustomers(res.data.records);
  }

  return (
    <div>
      {customers.map((customer) => {
        return <Link to={`/customer/${customer.id}`} key={customer.id}>
          <h3>{customer.fields?.name_company}</h3>
          {/* <img src={customer.fields?.client_logo} /> */}
          </Link>
      })}
    </div>
  );
}

export default CustomerList