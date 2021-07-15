import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import CommInfo from './CommInfo';
  
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
    // console.log(res.data.records);
    setCommunication(res.data.records);
  }

  return (
    <div>
      Communication List
      {communication.map((info) => {
        return (
          <div key={info.id} >
          <CommInfo fetchData={fetchData} info={info}  />
          </div>
        );
      }
      )}
    </div>
  );
}

export default CommList
