import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers`;

export default function CustomerDetail() {
  const [customer, setCustomer] = useState({});
  const { id } = useParams();
  // console.log(id)

  useEffect(() => {
    fetchCustomer();
  }, []);
  const fetchCustomer = async () => {
    const customerURL = `${URL}/${id}`;
    const res = await axios.get(customerURL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_KEY}`,
      },
    });
    setCustomer(res.data);
  };
  
  return (
    <div>
      <h2>{customer.fields?.name_company}</h2>
      <strong>Address:</strong>
      <p>{customer.fields?.address}</p>
      <strong>State:</strong>
      <p>{customer.fields?.state}</p>
      <strong>Zipcode:</strong>
      <p>{customer.fields?.zipcode}</p>
      <strong>Country:</strong>
      <p>{customer.fields?.country}</p>
      <strong>Customer Type:</strong>
      <p>{customer.fields?.customer_type}</p>
      <strong>Account Manager:</strong>
      <p>{customer.fields?.account_manager}</p>
      <Link to="/">HOMEPAGE</Link>
    </div>
  );
}