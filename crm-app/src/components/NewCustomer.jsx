import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers`;

const NewCustomer = () => {
  const [name_company, setNameCompany] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState(0);
  const [country, setCountry] = useState("");
  const [customer_type, setCustomerType] = useState("");
  const [account_manager, setAccountManager] = useState("");
  let history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      name_company,
      address,
      state,
      zipcode,
      country,
      customer_type,
      account_manager,
    };
    console.log(fields)
    const res = await axios.post(
      URL,
      { fields },
      {
        headers: { Authorization: `Bearer ${AIRTABLE_KEY}` },
      }
    );
    console.log(res);
    setNameCompany("");
    history.push(`/customers/${res.data.id}`);
  };

  return (
    <div>
      NEW CUSTOMER FORM
      <form onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input type="text" value={name_company} onChange={(e) => setNameCompany(e.target.value)} />
        <br />
        <label>Address</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        <br />
        <label>State</label>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
        <br />
        <label>Zipcode</label>
        <input type="number" value={zipcode} onChange={(e) => setZipcode(e.target.valueAsNumber)} />
        <br />
        <label>Country</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        <br />
        <label>Customer Type</label>
        <input type="text" value={customer_type} onChange={(e) => setCustomerType(e.target.value)} />
        <br />
        <label>Account Manager</label>
        <input type="text" value={account_manager} onChange={(e) => setAccountManager(e.target.value)} />
        <br />
        <button>Add Customer</button>
      </form>
    </div>
  );
}

export default NewCustomer

