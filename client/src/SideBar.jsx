import React, { useState } from 'react';
import { Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { ChevronDoubleRightIcon, CalendarIcon, MenuIcon, ShieldCheckIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import logo from "./assets/T.png";

export default function DefaultSidebar() {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark');
  };

  return (
    <Card className="h-[calc(110vh-2rem)] w-full max-w-[15rem] p-10 shadow-xl shadow-blue-gray-900/10 dark:bg-[#21242a]">
      <div className="mb-5 p-1 text-xl">
        <Typography variant="h1" color="blue-gray">
          <img src={logo} alt="Logo" className='h-[80px] mx-7' />
        </Typography>
      </div>
      <List className="space-y-[300px]">
        <div className='flex flex-col py-5'>
          <ListItem>
            <ListItemPrefix>
              <CalendarIcon className="h-5 w-5 mx-3" title="Calendar" />
            </ListItemPrefix>
            <Link to="/" className="sidebar-link">Time</Link>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <ChevronDoubleRightIcon className="h-5 w-5 mx-3" title="Upcoming" />
            </ListItemPrefix>
            <Link to="Upcoming" className="sidebar-link">Upcoming</Link>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <MenuIcon className="h-5 w-5 mx-3" title="Today" />
            </ListItemPrefix>
            <Link to="Today" className="sidebar-link">Tasks</Link>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <ShieldCheckIcon className="h-5 w-5 mx-3" title="StickyWall" />
            </ListItemPrefix>
            <Link to="StickyWall" className="sidebar-link">StickyWall</Link>
          </ListItem>
        </div>

        <ListItem>
          <ListItemPrefix>
            <button onClick={toggleDarkMode}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            </button>
          </ListItemPrefix>
        </ListItem>
      </List>
    </Card>
  );
}
