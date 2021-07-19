import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory, Link } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/communication`;

export default function EditComm() {
  const { id } = useParams();
  const history = useHistory();
  // console.log(id)

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])
  
  const fetchData = async () => {
    const communicationURL = `${URL}/${id}`;
    const res = await axios.get(communicationURL,
      {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    // console.log(res.data.fields);
    setFormData(res.data.fields);
  }

  const data = {
    name_contacted: "",
    contactName: "",
    name_company: "",
    contact_method: "",
    topic_discussed: "",
    expected_revenue: 0,
    notes: "",
  }

  const [formData, setFormData] = useState({ data });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const communicationURL = `${URL}/${id}`;
    // console.log(communication)
    // console.log(fields)
    const res = await axios.put(
      communicationURL,
      { fields: formData },
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_KEY}`,
        },
      }
    );
    console.log(res);
    history.push(`/customers/${FormData.name_company}`);
  };

  return (
    <section className="NewCustomerSection">
      <h1>EDIT / UPDATE COMMUNICATION ENTRY</h1>
      <div className="commDiv">
      <form className="commForm" onSubmit={handleUpdate}>
        <h3>Contact Name: {formData.name_contact}</h3>
        <h3>Customer: <Link to={`/customers/${formData.name_company}`} >{formData.name_company_customers}</Link></h3>
        <label className="commFormLabel">Contact Method</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={formData.contact_method} 
          name="contact_method"
          onChange={handleChange}
        />
        <br />

        <label className="commFormLabel">Topic Discussed</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={formData.topic_discussed}
          name="topic_discussed"
          onChange={handleChange}
        />
        <br />

        <label className="commFormLabel">Expected Revenues</label>
        <br />
          <input
          className="inputText"
          type="number"
          value={formData.expected_revenue}
          name="expected_revenue"
          onChange={(e) =>
            setFormData((current) => ({
              ...current,
              expected_revenue: parseInt(e.target.value),
            }))
          }
        />
        <br />

        <label className="commFormLabel">Notes</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={formData.notes}
          name="notes"
          onChange={handleChange}
        />
        <br />
        <button className="submitForm">UPDATE</button>
        </form>
        </div>
    </section>
  );
}