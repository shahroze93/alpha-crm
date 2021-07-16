import "./App.css";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CustomerList from "./components/CustomerList";
import CustomerDetail from "./components/CustomerDetail"
import NewCustomer from "./components/NewCustomer"
import ContactList from "./components/Contacts/ContactList"
import EditCustomer from "./components/Edit/EditCustomer";
import NewContact from "./components/Contacts/NewContact";
import CommList from "./components/Communication/CommList";
import NewComm from "./components/Communication/NewComm";
import EditContact from "./components/Edit/EditContact";
import EditComm from "./components/Edit/EditComm";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
        </header>
      <br />
      {/* <h1>WELCOME TO ALPHA CRM</h1> */}
      <Route exact path="/">
        <CustomerList />
      </Route>
      <Route path="/newCustomer">
        <NewCustomer />
      </Route>
      <Route path="/editCustomer/:id">
        <EditCustomer />
      </Route>
      <Route path="/customers/:id">
        <CustomerDetail />
      </Route>
      <Route exact path="/contacts">
        <ContactList />
      </Route>
      <Route path="/newContact">
        <NewContact />
      </Route>
      <Route path="/editContact/:id">
        <EditContact />
      </Route>
      <Route exact path="/communication">
        <CommList />
      </Route>
      <Route path="/newCommunication">
        <NewComm />
      </Route>
      <Route path="/editComm/:id">
        <EditComm />
      </Route>
    </div>
  );
}
export default App;
