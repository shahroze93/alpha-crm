import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts`;
const customerURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers?sort%5B0%5D%5Bfield%5D=name_company`;

export default function EditContact() {
  const [contact, setContact] = useState({});
  const { id } = useParams();
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
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const contactURL = `${URL}/${id}`;
    const res = await axios.put(
      contactURL,
      { fields: contact },
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
      <label>Contact Name</label>
        <input
          name="name_contact"
          value={contact.name_contact}
          onChange={handleChange} />
        <br />

      <label>Designation / Title / Position</label>
        <input
          type="text"
          value={contact.designation}
          name="designation"
          onChange={handleChange}
        />
        <br />
        <label>Phone</label>
        <input
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
        <label>Email</label>
        <input
          type="text"
          value={contact.email}
          name="email"
          onChange={handleChange}
        />
        <br />
        <label>Company Name</label>
        <input
          type="text"
          value={contact.name_company}
          name="name_company"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          value={contact.name_company_customers}
          name="name_company_customers"
          onChange={handleChange}
        />
        <br />  
        <label>Company Name</label>
        <select onChange={handleChange}>
        <option value="⬇️ Select a Company ⬇️"> -- Select Company -- </option>
          {droplist.map((company) => <option key={company.id} name="name_company_customers" value={company.id}>{company.fields.name_company}</option>)}
        </select>
        <br />
        <button>Update Customer Information</button>
      </form>
    </div>
  );
}