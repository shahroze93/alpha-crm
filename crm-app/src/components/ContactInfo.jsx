import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts`;

function ContactInfo(props) {
  // console.log(props)
  let history = useHistory();
  const id = (props.info.id);
  // console.log(id)
  
  const handleDelete = async () => {
    const contactURL = `${URL}/${id}`;
    const res = await axios.delete(contactURL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_KEY}`,
      },
    });
    console.log(res);
    if (props.fetchData) {
      props.fetchData() // for All contacts page refreshing
    }
    if (props.fetchCustomer) {
      props.fetchCustomer() // for CustomerDetail page refreshing
    }
  };

  return (
    <div key={props.info.id}>
        <h4>{props.info.fields.name_contact}</h4>
        <p>{props.info.fields.designation}</p>
        <p>{props.info.fields.phone}</p>
        <p>{props.info.fields.email}</p>
      <Link to={`/customers/${props.info.fields.name_company}`} ><p>{props.info.fields.name_company_customers}</p></Link>
      <button onClick={handleDelete}>Delete Contact</button>
      <br />
      <Link to={`/editContact/${props.info.id}`}>EDIT CONTACT</Link>
    </div>
  )
}

export default ContactInfo;


