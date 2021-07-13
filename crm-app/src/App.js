import "./App.css";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomerList from "./components/CustomerList";
import CustomerDetail from "./components/CustomerDetail"
import NewCustomer from "./components/NewCustomer"
// import CustomerList from "./components/CustomerList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <br />
      WELCOME TO ALPHA CRM
      <Route exact path="/">
        <CustomerList />
      </Route>
      <Route path="/new">
        <NewCustomer />
      </Route>
      <Route path="/customers/:id">
        <CustomerDetail />
      </Route>
    </div>
  );
}
export default App;
