import "./Communication.css"
import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import CommInfo from './CommInfo';
import NewComm from './NewComm';
import { Link } from "react-router-dom";
  
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
      <h1>SALES COMMUNICATIONS HISTORY</h1>
      <div className="commFormContainer">
      <NewComm fetchData={fetchData} />
      </div>
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
      <br />
      <Link to="/" className="customerButtons" >HOMEPAGE</Link>
    </div>
  );
}

export default CommList
