import React, { useState } from 'react';
import { Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { ChevronDoubleRightIcon, CalendarIcon, MenuIcon, ShieldCheckIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import logo from "./assets/T.png";

export default function DefaultSidebar() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prevState => !prevState);
  };

  return (
    <Card className={`w-full max-w-[15rem] p-10 shadow-xl shadow-blue-gray-900/10 h-[88vh] rounded-md bg-white dark:bg-[#31353E] ${sidebarCollapsed ? 'max-w-[4rem] p-' : ''}`}>
      <div className="mb-5 p-9 text-xl flex"> 
        <Typography variant="h1" color="blue-gray">
          <img 
            src={logo} 
            alt="Logo" 
            className={`h-[80px] ${darkMode ? 'text-white' : ''}`} ></img>
        </Typography>
      </div>
      <List className={`space-y-[300px] ${sidebarCollapsed ? 'justify-center' : ''} ${sidebarCollapsed ? 'text-center' : ''}`}> {/* Centrage des icônes */}
        <div className='flex flex-col py-5'>
          <ListItem>
            <ListItemPrefix>
              <button onClick={toggleSidebar}>
                {sidebarCollapsed ? (
                  <ChevronLeftIcon className="h-5 w-5 mx-3" title="Expand Sidebar" />
                ) : (
                  <ChevronDoubleRightIcon className="h-5 w-5 mx-3" title="Collapse Sidebar" />
                )}
              </button>
            </ListItemPrefix>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <Link to="/" className={`sidebar-link ${darkMode ? 'text-white' : ''}`}>
                <CalendarIcon className={`h-5 w-5 mx-3`} title="Calendar" />
              </Link>
            </ListItemPrefix>
            {!sidebarCollapsed && <Link to="/" className={`sidebar-link ${darkMode ? 'text-white' : ''}`}>Time</Link>}
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <Link to="/Upcoming" className={`sidebar-link ${darkMode ? 'text-white' : ''}`}>
                <ChevronDoubleRightIcon className={`h-5 w-5 mx-3`} title="Upcoming" />
              </Link>
            </ListItemPrefix>
            {!sidebarCollapsed && <Link to="/Upcoming" className={`sidebar-link ${darkMode ? 'text-white' : ''}`}>Upcoming</Link>}
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <Link to="/Today" className={`sidebar-link ${darkMode ? 'text-white' : ''}`}>
                <MenuIcon className={`h-5 w-5 mx-3`} title="Today" />
              </Link>
            </ListItemPrefix>
            {!sidebarCollapsed && <Link to="/Today" className={`sidebar-link ${darkMode ? 'text-white' : ''}`}>Tasks</Link>}
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <Link to="/StickyWall" className={`sidebar-link ${darkMode ? 'text-white' : ''}`}>
                <ShieldCheckIcon className={`h-5 w-5 mx-3`} title="StickyWall" />
              </Link>
            </ListItemPrefix>
            {!sidebarCollapsed && <Link to="/StickyWall" className={`sidebar-link ${darkMode ? 'text-white' : ''}`}>StickyWall</Link>}
          </ListItem>
        </div>

        <ListItem>
          <ListItemPrefix>
            <button onClick={toggleDarkMode}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            </button>
          
          </ListItemPrefix>
        </ListItem>
      </List>
    </Card>
  );
}
