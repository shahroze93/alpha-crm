import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;
const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers`;

export default function EditCustomer() {
  const [customer, setCustomer] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line
  }, []);
  const fetchCustomer = async () => {
    const customerURL = `${URL}/${id}`;
    const res = await axios.get(customerURL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_KEY}`,
      },
    });
    setCustomer(res.data.fields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const customerURL = `${URL}/${id}`;
    await axios.put(
      customerURL,
      { fields: customer },
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_KEY}`,
        },
      }
    );
    history.push(`/`);
  };

  return (
    <section className="NewCustomerSection" >
      <h1>EDIT / UPDATE CUSTOMER PROFILE</h1>
      <div className="commDiv">
      <form className="commForm" onSubmit={handleUpdate}>
      <label className="commFormLabel">Company Name</label>
      <br />
          <input
          className="inputText"
          name="name_company"
          value={customer.name_company}
          onChange={handleChange} />
        <br />

      <label className="commFormLabel">Zip Code</label>
      <br />
          <input
          className="inputText"
          type="number"
          value={customer.zipcode}
          name="zipcode"
          onChange={(e) =>
            setCustomer((prevCustomer) => ({
              ...prevCustomer,
              zipcode: parseInt(e.target.value),
            }))
          }
        />
        <br />
        <label className="commFormLabel">Address</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={customer.address}
          name="address"
          onChange={handleChange}
        />
        <br />
        <label className="commFormLabel">State</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={customer.state}
          name="state"
          onChange={handleChange}
        />
        <br />
        
        <label className="commFormLabel">Country</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={customer.country}
          name="country"
          onChange={handleChange}
        />
        <br />
        <label className="commFormLabel">Company Type</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={customer.customer_type}
          name="company_type"
          onChange={handleChange}
        />
        <br />
        
      <label className="commFormLabel">Company Logo / Image URL</label>
      <br />
      <input
        className="inputText"
        type="text"
        value={customer.company_logo}
        name="company_logo"
        onChange={handleChange}
          />
        <br />
          
        <label className="commFormLabel">Account Manager</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={customer.account_manager}
          name="account_manager"
          onChange={handleChange}
        />
        <br />
        <button className="submitForm">UPDATE</button>
        </form>
        </div>
    </section>
  );
}