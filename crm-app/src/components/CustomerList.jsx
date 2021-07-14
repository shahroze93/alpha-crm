import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
  
const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers`

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    // console.log(res.data.records);
    setCustomers(res.data.records);
  }

  return (
    <div>
      {customers.map((info) => {
        return <Link to={`/customers/${info.id}`} key={info.id}>
          <h3>{info.fields.name_company}</h3>
        </Link>
      })}
    </div>
  );
}

export default CustomerList
