import React from 'react';
import { Card, Typography, List, ListItem, ListItemPrefix, Chip } from "@material-tailwind/react";
import { PresentationChartBarIcon, UserCircleIcon, Cog6ToothIcon, PowerIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";

export default function DefaultSidebar() {
  return (
    <Card className="h-[calc(110vh-2rem)] w-full max-w-[15rem] p-10 shadow-xl shadow-blue-gray-900/10">
      <div className="mb-2 p-4 text-2xl">
        <Typography variant="h1" color="blue-gray">
          T-Tasks
        </Typography>
      </div>
      <List className="flex space-y-60 py-6">
        <div className='flex flex-col gap-8'>
        <ListItem className="flex items-center">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem className="flex items-center">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>


          <ListItem className="flex items-center">
            <ListItemPrefix>
              <CalendarDaysIcon className="h-5 w-5" />
            </ListItemPrefix>
            My Tasks
          </ListItem>
          <ListItem className="flex items-center">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
        </div>
        <div className=''>
          <ListItem className="flex items-center">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </div>
      </List>
    </Card>
  );
}
