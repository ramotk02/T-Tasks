import React, { useState, useEffect } from 'react';

const Calendar = () => {
    const [time, setTime] = useState('');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            const hour = date.getHours();
            const min = date.getMinutes();
            const sec = date.getSeconds();
            const year = date.getFullYear();
            const day = date.getDay();
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayOfWeek = daysOfWeek[day];

            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}, ${dayOfWeek}, ${year}`;
            setTime(formattedTime);
        };

        const timer = setInterval(updateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div id="clock" className={`animate-pulse cursor-pointer ${sidebarCollapsed ? 'text-center' : 'text-left'}`} onClick={time}>
                {time}
            </div>
            <h1 className={`animate__backInLeft ${sidebarCollapsed ? 'text-center' :'px-[550px]'}`}>Welcome</h1>
            <style>
                {`
                h1, #clock {
                    padding-top: 20px; 
                    font-size: 30px;
                }

                #clock {
                    font-size: 85px;
                    padding-right: 100px; 
                }
                `}
            </style>
        </section>
    );
}

export default Calendar;
