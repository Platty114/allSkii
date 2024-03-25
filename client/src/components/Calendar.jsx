import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Default styles
import "./CustomCalendarTheme.css"; // Your custom theme styles

moment.locale("en-GB"); // or any locale as needed
const localizer = momentLocalizer(moment);

// Initialize with a default set of events or an empty array if no initial events
const defaultEvents = [
  {
    start: moment().toDate(),
    end: moment().add(1, "days").toDate(),
    title: "Sample Event",
  },
  // Add more events here if necessary
];

export default function MyCalendar() {
  // Initialize your state with defaultEvents instead of null
  const [eventsData, setEventsData] = useState(defaultEvents);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };

  return (
    <div className="App">
      <Calendar
        views={["month", "week", "day", "agenda"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
