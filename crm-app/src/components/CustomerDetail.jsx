import "./CustomerDetail.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ContactInfo from "./Contacts/ContactInfo";
import NewComm from "./Communication/NewComm";
import CommInfo from "./Communication/CommInfo";

const AIRTABLE_KEY = process.env.REACT_APP_AIRTABLE_KEY;
const AIRTABLE_BASE = process.env.REACT_APP_AIRTABLE_BASE;

const URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/customers`;
const contactsURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/contacts`;
const commsURL = `https://api.airtable.com/v0/${AIRTABLE_BASE}/communication`;

export default function CustomerDetail() {
  const [customer, setCustomer] = useState({});
  const [contacts, setContacts] = useState([]);
  const [comm, setComms] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchCustomer();
  }, []);

    const fetchCustomer = async () => {
      setContacts([])
      setComms([])    
    const customerURL = `${URL}/${id}`;
    const res = await axios.get(customerURL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_KEY}`,
      },
    });
      setCustomer(res.data);
      if (res.data.fields.contacts) {
        getContacts(res.data.fields.contacts);
      };
      if (res.data.fields.communication) {
        getComms(res.data.fields.communication)
      };
  };

    const getContacts = async (contactArray) => {
    contactArray.forEach (async contact => { 
    const URL = `${contactsURL}/${contact}`;
    const res = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_KEY}`,
      },
    });
      // console.log(res.data)
      setContacts(prevState => ([...prevState, res.data]));
    })
  };
  
// console.log(contacts)

const getComms = async (commsArray) => {
  commsArray.forEach (async comm => { 
  const URL = `${commsURL}/${comm}`;
  const res = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_KEY}`,
    },
  });
    // console.log(res.data)
    setComms(prevState => ([...prevState, res.data]));
  })
};
  
// console.log(comm)
  
  return (
    <section>
      <h1>CUSTOMER PROFILE</h1>
      <div className="parent"> 
      <div className="div1">
      
      <div className="customerData">
      <img src={customer.fields?.company_logo} alt={customer.fields?.name_company} />
      <h2>{customer.fields?.name_company}</h2>
      <strong>Address:</strong>
      <p>{customer.fields?.address}</p>
      <strong>State:</strong>
      <p>{customer.fields?.state}</p>
      <strong>Zipcode:</strong>
      <p>{customer.fields?.zipcode}</p>
      <strong>Country:</strong>
      <p>{customer.fields?.country}</p>
      <strong>Customer Type:</strong>
      <p>{customer.fields?.customer_type}</p>
      <strong>Account Manager:</strong>
      <p>{customer.fields?.account_manager}</p>
      <br />
      <Link to={`/editCustomer/${id}`} className="customerButtons" >EDIT CUSTOMER PROFILE</Link>
      </div>
          
      <div className="contactData">
      <h1>Contacts & Info  <Link to="/newContact" className="customerButtons" >ADD A CONTACT</Link></h1>
      {contacts.map((info, index) => {
        return (
          <div className="customerContactDetails" key={index}>
          <ContactInfo fetchCustomer={fetchCustomer} info={info} />
          </div>
        )
      })}
      <br />
      </div>
      </div>
      
        

      <div className="div2">
      <h1>Communications</h1>
      <div className="commCustomer">    
      {comm.map((info, index) => {
          return (
        <CommInfo fetchCustomer={fetchCustomer} info={info} key={index} />
        );
      }
      )}
      </div>
          <NewComm fetchCustomer={fetchCustomer} />
          <br />
          <br />
          <Link to="/" className="customerButtons" >HOMEPAGE</Link>
        </div>
        </div>
    </section>
  );
}