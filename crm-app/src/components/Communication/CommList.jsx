import "./Communication.css"
import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import CommInfo from './CommInfo';
import NewComm from './NewComm';
  
const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/communication`

function CommList() {
  const [communication, setCommunication] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    setCommunication([])
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    // console.log(res.data.records);
    setCommunication(res.data.records);
  }

  return (
    <div>
      <h1>Sales Communications History</h1>
      <NewComm fetchData={fetchData} />
      <section className="commList" >
      {communication.map((info) => {
        return (
          <div className="comms" key={info.id} >
          <CommInfo fetchData={fetchData} info={info}  />
          </div>
        );
      }
      )}
      </section>
    </div>
  );
}

export default CommList
