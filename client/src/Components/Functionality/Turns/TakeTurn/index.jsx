import "./turns.css";

import Calendar from "react-calendar";
import React, { useState } from "react";

import Times from "./Times";

function TakeTurns(props) {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const miniDate = new Date();

  return (
    <div className="container">
      <div className="container d-flex p-2 justify-content-center">
        <div className="calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={() => setShowTime(true)}
            minDate={miniDate}
          />
        </div>
        <div>
          <Times
            showTime={showTime}
            date={date}
            vetSelect={props.vetSelect}
            updateCalendar={props.updateCalendar}
            setUpdateCalendar={props.setUpdateCalendar}
          />
        </div>
      </div>
    </div>
  );
}

export default TakeTurns;
