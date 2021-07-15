import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";


const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/communication`;
const customerURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers?sort%5B0%5D%5Bfield%5D=name_company`;
const contactURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts?sort%5B0%5D%5Bfield%5D=name_company_customers`;

const NewComm = (props) => {
  const [contactName, setNameContacted] = useState("");
  const [name_company, setNameCompany] = useState(""); 
  const [contact_method, setContactMethod] = useState("");
  const [topic_discussed, setTopicDiscussed] = useState("");
  const [expected_revenue, setExpectedRevenue] = useState(0);
  const [notes, setNotes] = useState("");
  const [droplist, setDroplist] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const res = await axios.get(customerURL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    // console.log(res.data.records);
    setDroplist(res.data.records);
  }

  let handleCompanyChange = (e) => {
    setNameCompany([e.target.value])
  }

  const [droplist2, setDroplist2] = useState([]);
  
  useEffect(() => {
    fetchData2();
  }, [])
  
  const fetchData2 = async () => {
    const res = await axios.get(contactURL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    // console.log(res.data.records);
    setDroplist2(res.data.records);
  }

  let handleContactChange = (e) => {
    setNameContacted([e.target.value])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      contactName,
      contact_method,
      topic_discussed,
      expected_revenue,
      notes,
      name_company
    };
    console.log(fields)
    const res = await axios.post(
      URL,
      { fields },
      {
        headers: { Authorization: `Bearer ${AIRTABLE_KEY}` },
      }
    );
    console.log(res.data);
    setNameContacted("");
    if (props.fetchCustomer) {
      props.fetchCustomer() // for CustomerDetail page refreshing
    }
    if (props.fetchData) {
      props.fetchData() // for Comms page refreshing
    }
  };

  return (
    <div>
      NEW COMMUNICATION FORM
      <form onSubmit={handleSubmit}>
        <label>Person Contacted</label>
        <br />
        <select onChange={handleContactChange}> 
        <option value="⬇️ Select a Contact ⬇️"> -- Select Contact -- </option>
          {droplist2.map((contact) => <option key={contact.id} value={contact.id}>{contact.fields.name_contact} ({contact.fields.name_company_customers})</option>)}
        </select>
        <br />
        
        <label>Company Name</label>
        <br />
        <select onChange={handleCompanyChange}>
        <option value="⬇️ Select a Company ⬇️"> -- Select Company -- </option>
          {droplist.map((company) => <option key={company.id} value={company.id}>{company.fields.name_company}</option>)}
        </select>
        <br />

        <label>Method of Contact</label>
        <br />
        <input type="text" value={contact_method} onChange={(e) => setContactMethod(e.target.value)} />
        <br />

        <label>Topic of Discussion</label>
        <br />
        <input type="text" value={topic_discussed} onChange={(e) => setTopicDiscussed(e.target.value)} />
        <br />

        <label>Expected Revenue</label>
        <br />
        <input type="number" value={expected_revenue} onChange={(e) => setExpectedRevenue(e.target.valueAsNumber)} />
        <br />
        
        <label>Notes</label>
        <br />
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <br />
        <button>Submit Communication</button>
      </form>
    </div>
  );
}

export default NewComm