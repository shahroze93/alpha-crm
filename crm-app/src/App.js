import "./App.css";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomerList from "./components/CustomerList";
import CustomerDetail from "./components/CustomerDetail"
import NewCustomer from "./components/NewCustomer"
import ContactList from "./components/ContactList"
import EditCustomer from "./components/EditCustomer";
import NewContact from "./components/NewContact";
import CommList from "./components/CommList";
import NewComm from "./components/NewComm";
import EditContact from "./components/EditContact";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
        </header>
      <br />
      <h1>WELCOME TO ALPHA CRM</h1>
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
    </div>
  );
}
export default App;
