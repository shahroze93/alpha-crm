import "./Customers.css"
import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import DeleteCustomer from './DeleteCustomer';
  
const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers?sort%5B0%5D%5Bfield%5D=name_company`

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
    <div className="customerListContainer">
      {/* <h1>All Customers</h1> */}
      {customers.map((info, index) => {
        return (
          <DeleteCustomer fetchData={fetchData} info={info} key={index} />
        )
      })}
        <Link to="/newCustomer"><h2 className="newCustomerButton" >ADD NEW CUSTOMER</h2></Link>
    </div>
  );
}

export default CustomerList
