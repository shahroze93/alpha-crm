import "./Customers.css"
import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import DeleteCustomer from './DeleteCustomer';
import { css } from "@emotion/react";
import Loader from "react-spinners/RiseLoader";

  
const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers?sort%5B0%5D%5Bfield%5D=name_company`

function CustomerSearch() {
  const [customers, setCustomers] = useState([]);
  
    // Loader added with assistance from https://github.com/davidhu2000/react-spinners
    let [loading, setLoading] = useState(true);
    const override = css`
      display: block;
      margin-top: 100px;
      margin: 0 auto;
    `;

  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    // console.log(res.data.records);
    setCustomers(res.data.records);
    setFilteredData(res.data.records)
    setLoading(!loading)
  }

  // Assistance taken from https://levelup.gitconnected.com/how-to-search-filter-through-data-in-react-26f1545fe3a1
  const [filteredData,setFilteredData] = useState(customers);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = customers.filter((data) => {
    return data.fields.search_id.search(value) !== -1;
    });
    console.log(result)
    setFilteredData(result);
    }

  return (
    <div className="customerListContainer">
      <label className="searchLabel" >SEARCH: </label>
      <input type="text" className="searchBar" onChange={(event) =>handleSearch(event)} placeholder="SEARCH" />
      <Loader color={'#4539b1'} loading={loading} css={override} size={120} />
      {filteredData?.map((info, index) => {
        return (
          <DeleteCustomer fetchData={fetchData} info={info} key={index} />
        )
      })}
        <Link to="/newCustomer"><h2 className="newCustomerButton" >ADD NEW CUSTOMER</h2></Link>
    </div>
  );
}

export default CustomerSearch
