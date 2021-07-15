import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import NewCustomer from './NewCustomer';
  
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
      All Customers
      {customers.map((info) => {
        return (
          <div key={info.id}>
          <Link to={`/customers/${info.id}`} >
          <h3>{info.fields.name_company}</h3>
              <img src={info.fields.company_logo} />
              </Link>
            <p>Address: {info.fields.address}, {info.fields.state}, {info.fields.country}</p>
            <p>Account Manager: {info.fields.account_manager}</p>
          </div>
        )
      })}
      <br />
      <NewCustomer />
    </div>
  );
}

export default CustomerList
