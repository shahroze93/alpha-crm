import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import CustomerInfo from './CustomerInfo';
  
const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts`

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
            <CustomerInfo info={info} key={info.id} />
        );
      }
      )}
    </div>
  );
}

export default ContactList
