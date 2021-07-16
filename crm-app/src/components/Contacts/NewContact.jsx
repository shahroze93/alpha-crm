import { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts`;
const customerURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers?sort%5B0%5D%5Bfield%5D=name_company`;

const NewContact = (props) => {
  const [name_contact, setNameContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState(1);
  const [email, setEmail] = useState("");
  const [name_company, setNameCompany] = useState([]);
  const [droplist, setDroplist] = useState([]);
  let history = useHistory();
  
  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const res = await axios.get(customerURL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    // console.log(res.data.records);
    setDroplist(res.data.records);
  }

  let handleCompanyChange = (e) => {
    setNameCompany([e.target.value])
  }

    const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = {
      name_contact,
      designation,
      phone,
      email,
      name_company
    };
    // console.log(fields)
    const res = await axios.post(
      URL,
      { fields },
      {
        headers: { Authorization: `Bearer ${AIRTABLE_KEY}` },
      }
    );
    console.log(res);
      setNameContact("");
      if (props.fetchData) {
        props.fetchData() // for All contacts page refreshing
      }
      if (props.fetchCustomer) {
        props.fetchCustomer() // for CustomerDetail page refreshing
      }
    if (res.data.id) {
      history.push(`/customers/${name_company}`);
    }
  };

  return (
    <div>
      NEW CONTACT FORM
      <form onSubmit={handleSubmit}>
        <label>Contact Name</label>
        <br />
        <input type="text" value={name_contact} onChange={(e) => setNameContact(e.target.value)} placeholder="Name" />
        <br />
        
        <label>Designation / Title / Position</label>
        <br />
        <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Title" />
        <br />
        
        <label>Phone</label>
        <br />
        <input type="number" value={phone} onChange={(e) => setPhone(e.target.valueAsNumber)} placeholder="Phone Number" />
        <br />
        
        <label>Email</label>
        <br />
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <br />
        
        <label>Company Name</label>
        <br />
        <select onChange={handleCompanyChange}>
        <option value="⬇️ Select a Company ⬇️"> -- Select Company -- </option>
          {droplist.map((company) => <option key={company.id} value={company.id}>{company.fields.name_company}</option>)}
        </select>
        <br />
        <button>Add Contact</button>
      </form>
    </div>
  );
}

export default NewContact

