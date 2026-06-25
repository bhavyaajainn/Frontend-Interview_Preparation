import React from "react";
import "./ReactCalendar.css";

const DayTimeSlots = () => {
  const slots = Array.from({ length: 24 }, (_, index) => {
    return index;
  });
  return (
    <>
      {slots.map((slot) => {
        return (
          <div key={slot} className="slot">
            {slot}:00
          </div>
        );
      })}
    </>
  );
};

export default DayTimeSlots;
