import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers/`

function CustomerDetail() {
  const [customer, setCustomer] = useState({});
  const { id } = useParams();
  const history = useHistory();
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    // const customerURL = `${URL}/${id}`;
    const customerURL = `https://api.airtable.com/v0/appOMpqkEcg4Uplpx/customers/recgfBEQyuflWGFnP`
    const res = await axios.get(customerURL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_KEY}`,
      },
    });
    console.log(res.data)
    setCustomer(res.data);
  };
  
  return (
    <div>
      <h2>{customer.fields?.name_company}</h2>
      <img src={customer.fields?.client_logo} alt={customer.fields?.name} />
      <h2>Test</h2>
      <Link to={`/edit-customer/${id}`}>Edit Customer</Link>
    </div>
  );
}

export default CustomerDetail;