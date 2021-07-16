import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts`;
const customerURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers?sort%5B0%5D%5Bfield%5D=name_company`;

export default function EditContact() {
  const [contact, setContact] = useState({});
  const [name_contact, setNameContact] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState(1);
  const [email, setEmail] = useState("");
  const [name_company, setNameCompany] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  // console.log(id)

  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const contactURL = `${URL}/${id}`;
    const res = await axios.get(contactURL,
      {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    // console.log(res.data.fields);
    setContact(res.data.fields);
  }

  const [droplist, setDroplist] = useState([]);
  
  useEffect(() => {
    fetchData2();
  }, [])
  
  const fetchData2 = async () => {
    const res = await axios.get(customerURL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    // console.log(res.data.records);
    setDroplist(res.data.records);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
    setNameContact(contact.name_contact);
    setDesignation(contact.designation);
    setPhone(contact.phone);
    setEmail(contact.email);;
    setNameCompany([e.target.value])
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const fields = {
      name_contact,
      designation,
      phone,
      email,
      name_company
    };
    const contactURL = `${URL}/${id}`;
    // console.log(contact)
    const res = await axios.put(
      contactURL,
      { fields },
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_KEY}`,
        },
      }
    );
    console.log(res);
    history.push(`/customers/${name_company}`);
  };

  return (
    <section className="NewCustomerSection" >
      <h1>EDIT / UPDATE CONTACT PROFILE</h1>
      <div className="commDiv">
      <form className="commForm" onSubmit={handleUpdate}>
      <label className="commFormLabel">Contact Name</label>
      <br />
          <input
          className="inputText"
          name="name_contact"
          value={contact.name_contact}
          onChange={handleChange} />
        <br />

      <label className="commFormLabel">Designation / Title / Position</label>
      <br />
          <input
          className="inputText"
          type="text"
          value={contact.designation}
          name="designation"
          onChange={handleChange}
        />
        <br />
        <label className="commFormLabel">Phone</label>
        <br />
          <input
          className="inputText"
          type="number"
          value={contact.phone}
          name="phone"
          onChange={(e) =>
            setContact((prevContact) => ({
              ...prevContact,
              phone: parseInt(e.target.value),
            }))
          }
        />
        <br />
        <label className="commFormLabel">Email</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={contact.email}
          name="email"
          onChange={handleChange}
        />
        <br />
        <label className="commFormLabel">Company Name</label>
        <br />
          <select className="selectOption" onChange={handleChange}>
          <option value={contact.name_company_customers}>{contact.name_company_customers}</option>
          {droplist.map((company) => <option key={company.id} name="name_company" value={company.id}>{company.fields.name_company}</option>)}</select>
        <br />
        <button className="submitForm">UPDATE</button>
        </form>
        </div>
    </section>
  );
}