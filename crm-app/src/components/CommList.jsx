import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
  
const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/communication`

function CommList() {
  const [communication, setCommunication] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    console.log(res.data.records);
    setCommunication(res.data.records);
  }

  return (
    <div>
      Communication List
      {communication.map((info) => {
          return (
            <div key={info.id}>
            <h4>Person Contacted: {info.fields.name_contacted}</h4>
            <p>Company Name: {info.fields.name_company_customers}</p>
            <p>Method of Contact: {info.fields.contact_method}</p>
            <p>Topic of Discussion: {info.fields.topic_discussed}</p>
            <p>Expected Revenue: {info.fields.expected_revenue}</p>
            <p>Notes: {info.fields.notes}</p>
          </div>
        );
      }
      )}
    </div>
  );
}

export default CommList
