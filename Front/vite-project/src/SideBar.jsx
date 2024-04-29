import React from 'react';
import { Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { ChevronDoubleRightIcon, CalendarIcon, MenuIcon, ArrowRightIcon, ShieldCheckIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import logo from "./assets/T.png";

export default function DefaultSidebar() {
  return (
    <Card className="h-[calc(110vh-2rem)] w-full max-w-[15rem] p-10 shadow-xl shadow-blue-gray-900/10">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
        `}
      </style>
      <div className="mb-5 p-1 text-xl">
        <Typography variant="h1" color="blue-gray">
          <img src={logo} alt="Logo" className='h-[80px] mx-7' />
        </Typography>
      </div>
      <List className="space-y-[300px]">
        <div className='flex flex-col py-5'>
          <ListItem>
            <ListItemPrefix>
              <ChevronDoubleRightIcon className="h-5 w-5 mx-3" title="Upcoming" />
            </ListItemPrefix>
            <Link to="/" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px' }}>Upcoming</Link>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <MenuIcon className="h-5 w-5 mx-3" title="Today" />
            </ListItemPrefix>
            <Link to="Today" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px' }}>Tasks</Link>
          </ListItem>
      
          <ListItem>
            <ListItemPrefix>
              <CalendarIcon className="h-5 w-5 mx-3" title="Calendar" />
            </ListItemPrefix>
            <Link to="Calendar" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px' }}>Calendar</Link>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <ShieldCheckIcon className="h-5 w-5 mx-3" title="StickyWall" />
            </ListItemPrefix>
            <Link to="StickyWall" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px' }}>StickyWall</Link>
          </ListItem>
        </div>

        <div>
          <ListItem>
            <ListItemPrefix>
              <ArrowRightIcon className="h-5 w-5 mx-3" title="Log Out" />
            </ListItemPrefix>
            <Link to="#" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px' }}>Log Out</Link>
          </ListItem>
        </div>
      </List>
    </Card>
  );
}
