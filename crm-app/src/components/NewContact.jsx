import { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts`;
const customerURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers`;

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
    console.log(fields)
    const res = await axios.post(
      URL,
      { fields },
      {
        headers: { Authorization: `Bearer ${AIRTABLE_KEY}` },
      }
    );
    console.log(res);
    setNameContact("");
    props.fetchCustomer();
  };

  return (
    <div>
      NEW CONTACT FORM
      <form onSubmit={handleSubmit}>
        <label>Contact Name</label>
        <input type="text" value={name_contact} onChange={(e) => setNameContact(e.target.value)} />
        <br />
        <label>Designation / Title / Position</label>
        <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        <br />
        <label>Phone</label>
        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <br />
        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Company Name</label>
        <select onChange={handleCompanyChange}> 
        <option value="⬇️ Select a Company ⬇️"> -- Select Company -- </option>
          {droplist.map((company) => <option key={company.id} value={company.id}>{company.fields.name_company}</option>)}
        </select>
        <button>Add Contact</button>
      </form>
    </div>
  );
}

export default NewContact

