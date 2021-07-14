import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts`;

const NewContact = () => {
  const [name_contact, setNameContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [name_company_customers, setCompanyName] = useState("");
  let history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      name_contact,
      designation,
      phone,
      email,
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
    setNameContact("");
    history.push(`/contacts/${res.data.id}`);
  };

  return (
    <div>
      NEW CONTACT FORM
      <form onSubmit={handleSubmit}>
        <label>Contact Name</label>
        <input type="text" value={name_contact} onChange={(e) => setNameContact(e.target.value)} />
        <br />
        <label>Designation / Title / Position</label>
        <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        <br />
        <label>Phone</label>
        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <br />
        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Company Name</label>
        <input type="text" value={name_company_customers} onChange={(e) => setCompanyName(e.target.value)} />
        <br />
        <button>Add Contact</button>
      </form>
    </div>
  );
}

export default NewContact

