import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Default styles
import "./CustomCalendarTheme.css"; // Your custom theme styles

moment.locale("en-GB"); // or any locale as needed
const localizer = momentLocalizer(moment);

const skiHillColors = {
  "Revelstoke": "rgba(31, 119, 180, 0.7)",   // Darker muted blue
  "Nakiska": "rgba(255, 127, 14, 0.7)",      // Darker safety orange
  "Sunshine": "rgba(44, 160, 44, 0.7)",      // Darker cooked asparagus green
  "SunPeaks": "rgba(214, 39, 40, 0.7)",      // Darker brick red
  "Lakelouise": "rgba(148, 103, 189, 0.7)",  // Darker muted purple
  "Fernie": "rgba(140, 86, 75, 0.7)",        // Darker chestnut brown
  "Kickinghorse": "rgba(227, 119, 194, 0.7)",// Darker raspberry yogurt pink
  "BigWhite": "rgba(127, 127, 127, 0.7)",    // Darker middle gray
  "Kimberley": "rgba(188, 189, 34, 0.7)",    // Darker curry yellow-green
  "Panorama": "rgba(44, 160, 44, 0.7)",      // Darker cooked asparagus green (same as Sunshine)
  "Norquay": "rgba(255, 187, 120, 0.7)",     // Darker light orange
  "SilverStar": "rgba(173, 73, 74, 0.7)",    // Darker darker coral
  "Whistler": "rgba(23, 190, 207, 0.7)",     // Darker blue-teal
  "RedMountain": "rgba(139, 69, 116, 0.7)",  // Darker dark purple
  "Apex": "rgba(255, 152, 150, 0.7)",        // Darker light red
};



export default function MyCalendar({ eventsData }) {
  // Initialize your state with defaultEvents instead of null
  const [events, setEvents] = useState([]);

  // Function to format events data
  const formatEventsData = () => {
    const formattedEvents = eventsData.map((event) => ({
      start: moment(event.date).toDate(),
      end: moment(event.date).add(2, "hours").toDate(),
      title: event.name,
      resource: event.hill, // Assign ski hill as resource
      // Assign color based on ski hill
      color: skiHillColors[event.hill] || "#000000", // Default color is black
    }));
    setEvents(formattedEvents);
  };

  // Call the formatEventsData function when eventsData changes
  useEffect(() => {
    if (eventsData && eventsData.length > 0) {
      formatEventsData();
    }
  }, [eventsData]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      setEvents([
        ...events,
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
        events={events}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        startAccessor="start"
        endAccessor="end"
        resourceAccessor="resource" // Set the resource accessor for colors
        eventPropGetter={(event, start, end, isSelected) => ({
          style: {
            backgroundColor: event.color, // Set event background color
            
          },
        })}
      />
    </div>
  );
}
