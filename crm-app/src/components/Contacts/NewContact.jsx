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
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [name_company, setNameCompany] = useState([]);
  const [droplist, setDroplist] = useState([]);
  let history = useHistory();
  
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line
  }, [])
  
  const fetchData = async () => {
    const res = await axios.get(customerURL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    setDroplist(res.data.records);
  }

  let handleCompanyChange = (e) => {
    setNameCompany([e.target.value])
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const searchname = name_contact.toLowerCase().toString();
      const contact_id = searchname
    const fields = {
      name_contact,
      contact_id,
      designation,
      phone,
      email,
      name_company
    };
    const res = await axios.post(
      URL,
      { fields },
      {
        headers: { Authorization: `Bearer ${AIRTABLE_KEY}` },
      }
    );
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
    <section className="NewCustomerSection" >
      CREATE CONTACT FORM
      <div className="commDiv">
      <form className="commForm" onSubmit={handleSubmit}>
        <label className="commFormLabel" >Contact Name</label>
        <br />
        <input className="inputText" type="text" value={name_contact} onChange={(e) => setNameContact(e.target.value)} placeholder="Name" />
        <br />
        
        <label className="commFormLabel">Designation / Title / Position</label>
        <br />
        <input className="inputText" type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Title" />
        <br />
        
        <label className="commFormLabel">Phone</label>
        <br />
        <input className="inputText" type="number" value={phone} onChange={(e) => setPhone(e.target.valueAsNumber)} placeholder="Phone Number" />
        <br />
        
        <label className="commFormLabel">Email</label>
        <br />
        <input className="inputText" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <br />
        
        <label className="commFormLabel">Company Name</label>
        <br />
        <select className="selectOption" onChange={handleCompanyChange}>
        <option value="⬇️ Select a Company ⬇️"> -- Select Company -- </option>
          {droplist.map((company) => <option key={company.id} value={company.id}>{company.fields.name_company}</option>)}
        </select>
        <br />
        <button className="submitForm" >Add Contact</button>
        </form>
        </div>
    </section>
  );
}

export default NewContact

