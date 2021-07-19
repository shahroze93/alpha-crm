import "./App.css";
import React, { useState } from "react";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/DarkMode/GlobalStyles";
import { lightTheme, darkTheme } from "./components/DarkMode/Themes"
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CustomerDetail from "./components/CustomerDetail"
import NewCustomer from "./components/NewCustomer"
import EditCustomer from "./components/Edit/EditCustomer";
import NewContact from "./components/Contacts/NewContact";
import CommList from "./components/Communication/CommList";
import NewComm from "./components/Communication/NewComm";
import EditContact from "./components/Edit/EditContact";
import EditComm from "./components/Edit/EditComm";
import Footer from "./components/Footer/Footer";
import CustomerSearch from "./components/CustomerSearch";
import ContactSearch from "./components/Contacts/ContactSearch";


function App() {
  // Dark mode assistance taken from https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/#top
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
}
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <>
    <GlobalStyles/>
      <div className="App">
      <header>
        <Navbar />
      </header>
      <br />
      <div className="main" >
      <Route exact path="/">
        <CustomerSearch />  
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
        <ContactSearch /> 
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
      <footer>
        <Footer themeToggler={themeToggler} />
      </footer>
        </div>
        </>
    </ThemeProvider>
  );
}
export default App;
