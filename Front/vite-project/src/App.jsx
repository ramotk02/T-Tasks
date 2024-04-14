// App.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import Upcoming from "./components/pages/Upcoming";
import Today from "./components/pages/Today";
import StickyWall from "./components/pages/StickyWall";
import Calendar from "./components/pages/Calendar";
import NoPage from "./components/pages/NoPage"; 

function App() {
  return (
    <BrowserRouter>
      <section className="flex">
        <SideBar />
        <Routes>
          <Route path="/" element={<Upcoming />} />
          <Route path="/StickyWall" element={<StickyWall />} />
          <Route path="/Today" element={<Today />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);

export default App;
