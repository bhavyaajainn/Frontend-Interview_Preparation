import React from "react";
import DayTimeSlots from "./DayTimeSlots";
import "./ReactCalendar.css";
import events from "./eventsdata.json";
import Events from "./Events";

const DayView = () => {
  return (
    <div className="calendar">
      <div className="line"></div>
      <DayTimeSlots />
      <Events events={events} />
    </div>
  );
};

export default DayView;
