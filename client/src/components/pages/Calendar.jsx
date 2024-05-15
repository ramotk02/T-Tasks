import React, { useState, useEffect } from 'react';

const Calendar = () => {
    const [time, setTime] = useState('');

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

        // Clean up the timer
        return () => clearInterval(timer);
    }, []);

    return (
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div id="clock" className="animate-pulse cursor-pointer" onClick={time}>
                {time}
            </div>
            <h1 className="animate__backInLeft">Welcome, Sir</h1>
            <style>
                {`
                h1 {
                    text-align: center;
                    padding-top: 20px; 
                    font-size: 30px;

                }

                #clock {
                    font-size: 100px;
                    padding-left: 100px; 
                
                }
                `}
            </style>
        </section>
    );
}

export default Calendar;
