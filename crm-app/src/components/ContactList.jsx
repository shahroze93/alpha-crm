import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
  
const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts?api_key=${AIRTABLE_KEY}`

function ContactList() {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    console.log(res.data.records);
    setContacts(res.data.records);
  }

  return (
    <div>
      Contact List
      {contacts.map((info) => {
          return (
            <div key={info.id}>
            <h4>{info.fields.name_contact}</h4>
            <p>{info.fields.designation}</p>
              <p>{info.fields.phone}</p>
              <p>{info.fields.email}</p>
              <p>{info.fields.name_company_customers}</p>
          </div>
        );
      }
      )}
      
      {/* {contacts.map((info) => {
        return <Link to={`/customers/${info.id}`} key={info.id}>
          <h3>{info.fields.name_contact}</h3>
        </Link>
      })} */}
    </div>
  );
}

export default ContactList
