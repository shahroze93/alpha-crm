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

function ContactSearch() {
  const [contacts, setContacts] = useState([]);
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
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    setContacts(res.data.records);
    setFilteredData(res.data.records)
  }

  const [filteredData,setFilteredData] = useState(contacts);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = contacts.filter((data) => {
    return data.fields.contact_id.search(value) !== -1;
    });
    console.log(result)
    setFilteredData(result);
    }

  return (<div>{loading ? <p>loading...</p> :
    <div>
      <h1>CONTACT LIST</h1>
      <div className="commFormContainer">
        <NewContact fetchData={fetchData} />
      </div>
      <label className="searchLabel" >SEARCH: </label>
      <input type="text" className="searchBar" onChange={(event) => handleSearch(event)} placeholder="SEARCH" />
      <section className="contactList" >
        {filteredData.map((info) => {
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
  }</div>
  );
}

export default ContactSearch
