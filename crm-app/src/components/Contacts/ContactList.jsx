import './Contacts.css';
import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import ContactInfo from './ContactInfo';
import NewContact from './NewContact';
import {Link} from "react-router-dom"
  
const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts?sort%5B0%5D%5Bfield%5D=name_company_customers`

function ContactList() {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])
  
  const fetchData = async () => {
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    // console.log(res.data.records);
    setContacts(res.data.records);
  }

  return (
    <div>
      <h1>CONTACT LIST</h1>
      <div className="commFormContainer">
        <NewContact fetchData={fetchData} />
        </div>
      <section className="contactList" >
      {contacts.map((info) => {
        return (
          <div className="contacts" key={info.id} >
            <ContactInfo fetchData={fetchData} info={info} />
          </div>
        );
      }
        )}
      </section>
      <br />
      <Link to="/" className="customerButtons" >HOMEPAGE</Link>
    </div>
  );
}

export default ContactList
