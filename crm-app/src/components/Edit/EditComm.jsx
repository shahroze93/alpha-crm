import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useHistory, Link } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/communication`;

export default function EditComm() {
  const [communication, setCommunication] = useState({});
  const [contactName, setNameContacted] = useState("");
  const [name_company, setNameCompany] = useState(""); 
  const [contact_method, setContactMethod] = useState("");
  const [topic_discussed, setTopicDiscussed] = useState("");
  const [expected_revenue, setExpectedRevenue] = useState(1);
  const [notes, setNotes] = useState("");
  const { id } = useParams();
  const history = useHistory();
  // console.log(id)

  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const communicationURL = `${URL}/${id}`;
    const res = await axios.get(communicationURL,
      {
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}` }
    });
    // console.log(res.data.fields);
    setCommunication(res.data.fields);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunication((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
    setNameContacted(communication.contactName)
    setNameCompany(communication.name_company)
    setContactMethod(communication.contact_method);
    setTopicDiscussed(communication.topic_discussed);
    setExpectedRevenue(communication.expected_revenue);
    setNotes(communication.notes);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const fields = {
      contactName,
      name_company,
      contact_method,
      topic_discussed,
      expected_revenue,
      notes,
    };
    const communicationURL = `${URL}/${id}`;
    // console.log(communication)
    // console.log(fields)
    const res = await axios.put(
      communicationURL,
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
    <section className="NewCustomerSection">
      <h1>EDIT / UPDATE COMMUNICATION ENTRY</h1>
      <div className="commDiv">
      <form className="commForm" onSubmit={handleUpdate}>
        <h3>Contact Name: {communication.name_contact}</h3>
        <h3>Customer: <Link to={`/customers/${communication.name_company}`} >{communication.name_company_customers}</Link></h3>
        <label className="commFormLabel">Contact Method</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={communication.contact_method}
          name="contact_method"
          onChange={handleChange}
        />
        <br />

        <label className="commFormLabel">Topic Discussed</label>
        <br />
          <input
          className="inputText"
          type="text"
          value={communication.topic_discussed}
          name="topic_discussed"
          onChange={handleChange}
        />
        <br />

        <label className="commFormLabel">Expected Revenues</label>
        <br />
          <input
          className="inputText"
          type="number"
          value={communication.expected_revenue}
          name="expected_revenue"
          onChange={(e) =>
            setCommunication((current) => ({
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
          value={communication.notes}
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