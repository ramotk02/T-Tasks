import React from 'react';
import { Card, Typography, List, ListItem, ListItemPrefix, Chip } from "@material-tailwind/react";
import {  ChevronDoubleRightIcon, CalendarDaysIcon, ListBulletIcon,ArrowRightStartOnRectangleIcon, ShieldCheckIcon} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import logo from "./assets/T.png"

export default function DefaultSidebar() {
  return (
    <Card className="h-[calc(110vh-2rem)] w-full max-w-[15rem] p-10 shadow-xl shadow-blue-gray-900/10">
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
            <Link to="/">Upcoming</Link>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <ListBulletIcon className="h-5 w-5 mx-3" title="Today" />
            </ListItemPrefix>
            <Link to="Today">Today</Link>
          </ListItem>
      
          <ListItem>
            <ListItemPrefix>
              <CalendarDaysIcon className="h-5 w-5 mx-3" title="Calendar" />
            </ListItemPrefix>
            <Link to="Calendar">Calendar</Link>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <ShieldCheckIcon className="h-5 w-5 mx-3" title="StickWall" />
            </ListItemPrefix>
            <Link to="StickWall">StickWall</Link>
          </ListItem>
        </div>

        <div>
          <ListItem>
            <ListItemPrefix>
              <ArrowRightStartOnRectangleIcon className="h-5 w-5 mx-3" title="Log Out" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </div>
      </List>
    </Card>
  );
}
