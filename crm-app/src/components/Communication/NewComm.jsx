import "./Communication.css"
import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/communication`;
const customerURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers?sort%5B0%5D%5Bfield%5D=name_company`;
const contactURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts?sort%5B0%5D%5Bfield%5D=name_company_customers`;

const NewComm = (props) => {
  const [name_contacted, setContactName] = useState("");
  const [contactName, setNameContacted] = useState("");
  const [name_company, setNameCompany] = useState(""); 
  const [contact_method, setContactMethod] = useState("");
  const [topic_discussed, setTopicDiscussed] = useState("");
  const [expected_revenue, setExpectedRevenue] = useState(0);
  const [notes, setNotes] = useState("");
  const [toggle, setToggle] = useState(false);
  
  const [droplist, setDroplist] = useState([]);
  const [loading, setloading] = useState(true)
  
  useEffect(() => {
    let mounted = true
    fetchData().then(() => {
        if (mounted) {
            setloading(false)
        }
    })

    return function cleanup() {
        mounted = false
    }
}, [])
  
  const fetchData = async () => {
    const res = await axios.get(customerURL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    setDroplist(res.data.records);
  }

  let handleCompanyChange = (e) => {
    setNameCompany([e.target.value])
  }

  const [droplist2, setDroplist2] = useState([]);
  
  useEffect(() => {
    fetchData2();
    // eslint-disable-next-line
  }, [])
  
  const fetchData2 = async () => {
    const res = await axios.get(contactURL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    setDroplist2(res.data.records);
  }

  let handleContactChange = (e) => {
    setNameContacted([e.target.value])
    setToggle(current => !current)
  }

  useEffect(() => {
    fetchName();
    // eslint-disable-next-line
  }, [toggle])

  const fetchName = async () => {
    const nameURL = `${URL}/${contactName}`;
    const res = await axios.get(nameURL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    setContactName(res.data.fields?.name_contact)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      name_contacted,
      contactName,
      contact_method,
      topic_discussed,
      expected_revenue,
      notes,
      name_company
    };
    await axios.post(
      URL,
      { fields },
      {
        headers: { Authorization: `Bearer ${AIRTABLE_KEY}` },
      }
    );
    setNameContacted("");
    if (props.fetchCustomer) {
      props.fetchCustomer() // for CustomerDetail page refreshing
    }
    if (props.fetchData) {
      props.fetchData() // for Comms page refreshing
    }
  };

  return (<div>{loading ? <p>loading...</p> :
    <section className="NewCommSection">
      NEW COMMUNICATION FORM
      <div className="commDiv">
        <form className="commForm" onSubmit={handleSubmit}>
          <label className="commFormLabel" >Person Contacted</label>
          <br />
          <select className="selectOption" onChange={handleContactChange}>
            <option value="⬇️ Select a Contact ⬇️"> -- Select Contact -- </option>
            {droplist2.map((contact) => <option key={contact.id} value={contact.id}>{contact.fields.name_contact} ({contact.fields.name_company_customers})</option>)}
          </select>
          <br />
        
          <label className="commFormLabel">Company Name</label>
          <br />
          <select className="selectOption" onChange={handleCompanyChange}>
            <option value="⬇️ Select a Company ⬇️"> -- Select Company -- </option>
            {droplist.map((company) => <option key={company.id} value={company.id}>{company.fields.name_company}</option>)}
          </select>
          <br />

          <label className="commFormLabel">Method of Contact</label>
          <br />
          <input className="inputText" type="text" value={contact_method} onChange={(e) => setContactMethod(e.target.value)} placeholder="Method" />
          <br />

          <label className="commFormLabel">Topic of Discussion</label>
          <br />
          <input className="inputText" type="text" value={topic_discussed} onChange={(e) => setTopicDiscussed(e.target.value)} placeholder="Topic" />
          <br />

          <label className="commFormLabel">Expected Revenue</label>
          <br />
          <input className="inputText" type="number" value={expected_revenue} onChange={(e) => setExpectedRevenue(e.target.valueAsNumber)} />
          <br />
        
          <label className="commFormLabel">Notes</label>
          <br />
          <textarea className="inputText" type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Type your notes here" />
          <br />
          <button className="submitForm" >SUBMIT</button>
        </form>
      </div>
    </section>
  }</div>
  );
}

export default NewComm