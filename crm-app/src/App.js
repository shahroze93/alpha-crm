import "./App.css";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomerList from "./components/CustomerList";
import CustomerDetail from "./components/CustomerDetail"
import NewCustomer from "./components/NewCustomer"
import ContactList from "./components/ContactList"

function App() {
  return (
    <div className="App">
      <Navbar />
      <br />
      WELCOME TO ALPHA CRM
      <Route exact path="/">
        <CustomerList />
      </Route>
      <Route path="/newCustomer">
        <NewCustomer />
      </Route>
      <Route path="/customers/:id">
        <CustomerDetail />
      </Route>
      <Route exact path="/contacts">
        <ContactList />
      </Route>
    </div>
  );
}
export default App;
