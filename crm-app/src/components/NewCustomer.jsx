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
  const [company_logo, setCompanyLogo] = useState("");
  const [status, setStatus] = useState("New")
  let history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // the code below was added so that all names can be regiestered in lower case for future search optimization
    const searchname = name_company.toLowerCase().toString();
    const search_id = searchname
    setStatus("New");
    const fields = {
      name_company,
      search_id,
      address,
      state,
      zipcode,
      country,
      customer_type,
      account_manager,
      company_logo,
      status,
    };
    const res = await axios.post(
      URL,
      { fields },
      {
        headers: { Authorization: `Bearer ${AIRTABLE_KEY}` },
      }
    );
    setNameCompany("");
    history.push(`/customers/${res.data.id}`);
  };

  return (
    <section className="NewCustomerSection">
      <h1>CREATE / ADD NEW CUSTOMER</h1>
      <div className="commDiv">
      <form className="commForm" onSubmit={handleSubmit}>
        <label className="commFormLabel">Company Name</label>
        <br />
        <input className="inputText" type="text" value={name_company} onChange={(e) => setNameCompany(e.target.value)} placeholder="Name" />
        <br />

        <label className="commFormLabel">Address</label>
        <br />
        <input className="inputText" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
        <br />

        <label className="commFormLabel">State</label>
        <br />
        <input className="inputText" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
        <br />

        <label className="commFormLabel">Zipcode</label>
        <br />
        <input className="inputText" type="number" value={zipcode} onChange={(e) => setZipcode(e.target.valueAsNumber)}placeholder="Zip Code" />
        <br />

        <label className="commFormLabel">Country</label>
        <br />
        <input className="inputText" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
        <br />

        <label className="commFormLabel">Customer Type</label>
        <br />
        <input className="inputText" type="text" value={customer_type} onChange={(e) => setCustomerType(e.target.value)} placeholder="Type" />
        <br />

        <label className="commFormLabel">Account Manager</label>
        <br />
        <input className="inputText" type="text" value={account_manager} onChange={(e) => setAccountManager(e.target.value)} placeholder="Account Manager" />
        <br />

        <label className="commFormLabel">Company Logo / Image URL</label>
        <br />
        <input className="inputText" type="text" value={company_logo} onChange={(e) => setCompanyLogo(e.target.value)} placeholder="Image URL" />
        <br />

        <button className="submitForm" >CREATE</button>
        </form>
        </div>
    </section>
  );
}

export default NewCustomer

