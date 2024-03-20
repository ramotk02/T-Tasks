import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBar from "./SideBar";
import CalendarStyle from "./components/CalendarStyle";

function App() {
  return (
    <Router>
      <section className="flex">
        <SideBar />
        <Switch>
          <Route path="/calendar">
            <CalendarStyle />
          </Route>
          
        </Switch>
      </section>
    </Router>
  );
}

export default App;
