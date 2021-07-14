import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/communication`;
const customerURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers`;

const NewComm = (props) => {
  const [name_contacted, setNameContacted] = useState("");
  const [name_company, setNameCompany] = useState(""); 
  const [contact_method, setContactMethod] = useState("");
  const [topic_discussed, setTopicDiscussed] = useState("");
  const [expected_revenue, setExpectedRevenue] = useState(0);
  const [notes, setNotes] = useState("");
  let history = useHistory();
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      name_contacted,
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
    console.log(res);
    setNameContacted("");
    if (res.data.id) {
      history.push(`/customers/${res.data.id}`);
    }
    props.fetchCustomer();
  };

  return (
    <div>
      NEW COMMUNICATION FORM
      <form onSubmit={handleSubmit}>
        <label>Person Contacted</label>
        <input type="text" value={name_contacted} onChange={(e) => setNameContacted(e.target.value)} />
        <br />
        <label>Company Name</label>
        <select onChange={handleCompanyChange}> 
        <option value="⬇️ Select a Company ⬇️"> -- Select Company -- </option>
          {droplist.map((company) => <option key={company.id} value={company.id}>{company.fields.name_company}</option>)}
        </select>
        <br />
        <label>Method of Contact</label>
        <input type="text" value={contact_method} onChange={(e) => setContactMethod(e.target.value)} />
        <br />
        <label>Topic of Discussion</label>
        <input type="text" value={topic_discussed} onChange={(e) => setTopicDiscussed(e.target.value)} />
        <br />
        <label>Expected Revenue</label>
        <input type="number" value={expected_revenue} onChange={(e) => setExpectedRevenue(e.target.valueAsNumber)} />
        <br />
        <label>Notes</label>
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <br />
        <button>Add Comm</button>
      </form>
    </div>
  );
}

export default NewComm

