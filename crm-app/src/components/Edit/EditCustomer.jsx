import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;
const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers`;

export default function EditCustomer() {
  const [customer, setCustomer] = useState([]);
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
    const res = await axios.put(
      customerURL,
      { fields: customer },
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_KEY}`,
        },
      }
    );
    console.log(res);
  };

  return (
    <div>
      EDIT
      <form onSubmit={handleUpdate}>
      <label>Company Name</label>
        <input
          name="name_company"
          value={customer.name_company}
          onChange={handleChange} />
        <br />

      <label>Zip Code</label>
        <input
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
        <label>Address</label>
        <input
          type="text"
          value={customer.address}
          name="address"
          onChange={handleChange}
        />
        <br />
        <label>State</label>
        <input
          type="text"
          value={customer.state}
          name="state"
          onChange={handleChange}
        />
        <br />
        
        <label>Country</label>
        <input
          type="text"
          value={customer.country}
          name="country"
          onChange={handleChange}
        />
        <br />
        <label>Company Type</label>
        <input
          type="text"
          value={customer.customer_type}
          name="company_type"
          onChange={handleChange}
        />
        <br />
        <label>Account Manager</label>
        <input
          type="text"
          value={customer.account_manager}
          name="account_manager"
          onChange={handleChange}
        />
        <br />
        <button>Update Customer Information</button>
      </form>
    </div>
  );
}