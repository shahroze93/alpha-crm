import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts`;
const customerURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers?sort%5B0%5D%5Bfield%5D=name_company`;

export default function EditContact () {
  const { id } = useParams();
  const history = useHistory();


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])
  
  const fetchData = async () => {
    const contactURL = `${URL}/${id}`;
    const res = await axios.get(contactURL,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_KEY}`
        }
    });
    setFormData(res.data.fields);
  }

  const data = {
    name_contact: "",
    designation: "",
    phone: 0,
    email: "",
    name_company: "",
  }

  const [formData, setFormData] = useState({ data });

  const [droplist, setDroplist] = useState([]);
  
  useEffect(() => {
    fetchData2();
  }, [])
  
  const fetchData2 = async () => {
    const res = await axios.get(customerURL, {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    setDroplist(res.data.records);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const fields = {
      name_contact: formData.name_contact,
      designation: formData.designation,
      phone: formData.phone,
      email: formData.email,
      name_company: formData.name_company,
    };
    const contactURL = `${URL}/${id}`;
    await axios.put(
      contactURL,
      { fields },
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_KEY}`,
        },
      }
    );
    history.push(`/customers/${formData.name_company}`);
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
          value={formData.name_contact|| ""}
          onChange={handleChange} />
        <br />

      <label className="commFormLabel">Designation / Title / Position</label>
      <br />
          <input
          className="inputText"
          type="text"
          value={formData.designation|| ""}
          name="designation"
          onChange={handleChange}
        />
        <br />
        <label className="commFormLabel">Phone</label>
        <br />
          <input
          className="inputText"
          type="number"
          value={formData.phone|| 0}
          name="phone"
          onChange={(e) =>
            setFormData((prevContact) => ({
              ...prevContact,
              phone: parseInt(e.target.value),
            }))|| 0
          }
        />
        <br />
        <label className="commFormLabel">Email</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={formData.email|| ""}
          name="email"
          onChange={handleChange}
        />
        <br />
        <label className="commFormLabel">Company Name</label>
        <br />
          <select className="selectOption" onChange={handleChange}>
          <option value={formData.name_company_customers}>{formData.name_company_customers}</option>
          {droplist.map((company) => <option key={company.id} name="name_company" value={company.id|| ""}>{company.fields.name_company}</option>)}</select>
        <br />
        <button className="submitForm">UPDATE</button>
        </form>
        </div>
    </section>
  );
}