import "./App.css";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomerList from "./components/CustomerList";
import CustomerDetail from "./components/CustomerDetail";
import NewCustomer from "./components/NewCustomer.jsx";
import EditCustomer from "./components/EditCustomer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <br />
      <Route exact path="/">
      <h1>Alpha CRM</h1>
      </Route>
      <CustomerList />
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
