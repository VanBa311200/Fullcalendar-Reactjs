import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  ThirdPartyDraggable,
  Draggable,
} from "@fullcalendar/interaction";
import dragula from "react-dragula";
import Dropdown from "react-dropdown";

import Popup from "./components/Popup";
import DatePickerCustome from "./components/DatePickerCustome";
// import { addMoreDayToDate } from "./utils";

import "./App.css";
import "react-dropdown/style.css";
import "@fullcalendar/common/main.css"; // Import common styles

const events = [
  {
    groupId: "12",
    start: "2024-11-13T11:30:00+07:00",
    end: "2024-11-13T13:30:00+07:00",
    title: "Meeting",
    backgroundColor: "blue",
    borderColor: "blue",
  },
  {
    groupId: "13",
    start: "2024-11-13T06:30:00+07:00",
    end: "2024-11-13T07:30:00+07:00",
    title: "Swiming",
    backgroundColor: "blue",
    borderColor: "blue",
  },
  {
    groupId: "15",
    start: "2024-11-14T08:00:00+07:00",
    end: "2024-11-14T11:30:00+07:00",
    title: "Meeting",
    backgroundColor: "red",
    borderColor: "red",
  },
];

export default function Calendar() {
  const fullcalendarRef = useRef();
  const sidebarEventsRef = useRef();

  // State to manage selected view
  const [selectedView, setSelectedView] = useState("dayGridMonth");
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  // View options
  const viewOptions = [
    { value: "dayGridMonth", label: "Month View" },
    { value: "dayGridWeek", label: "Week View" },
    { value: "dayGridDay", label: "Day View" },
  ];

  const externalEvents = [
    { title: "Jobs 1", color: "#0097a7", custom: "fdsfdsfds" },
    { title: "Jobs 2", color: "#f44336" },
    { title: "Jobs 3", color: "#f57f17" },
    { title: "Jobs 4", color: "#90a4ae" },
  ];

  // Handle view change
  const handleViewChange = ({ value }) => {
    const calendarApi = fullcalendarRef.current.getApi();
    calendarApi.changeView(value);
    setSelectedView(value);
  };

  const handleDateClick = (arg) => {
    console.log(arg);
    setPopupPosition({ x: arg.jsEvent.clientX, y: arg.jsEvent.clientY });
    setShowPopup(true);
  };

  const handleOnClose = () => {
    setShowPopup(false);
  };

  const handleDatePickerChange = (dates) => {
    const [start, end] = dates;
    let endDay = new Date(end);
    endDay.setDate(new Date(end).getDate() + 1);

    const calendarApi = fullcalendarRef.current.getApi();

    if (start && end) {
      calendarApi.changeView("timeGrid");
      calendarApi.setOption("visibleRange", {
        start,
        end: endDay,
      });
    }
  };

  useEffect(() => {
    new ThirdPartyDraggable(sidebarEventsRef, {
      itemSelector: ".item-event",
      mirrorSelector: ".gu-mirror", // the dragging element that dragula renders
      eventData: function (eventEl) {
        console.log("eventEl", eventEl);
        return {
          title: eventEl.innerText,
        };
      },
    });
  }, []);

  return (
    <div className="container">
      {/* Dropdown for view selection */}
      <div className="sidebar-container">
        <div id="external-events">
          <p>
            <strong>Draggable Events</strong>
          </p>

          <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event">
            <div class="fc-event-main">My Event 1</div>
          </div>
          <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event">
            <div class="fc-event-main">My Event 2</div>
          </div>
          <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event">
            <div class="fc-event-main">My Event 3</div>
          </div>
          <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event">
            <div class="fc-event-main">My Event 4</div>
          </div>
          <div class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event">
            <div class="fc-event-main">My Event 5</div>
          </div>
        </div>
      </div>
      <div style={{ height: "100vh", width: "100vw" }}>
        <div className="header-toolbar">
          <Dropdown
            className="dropdown-toolbar"
            options={viewOptions}
            onChange={handleViewChange}
            value={selectedView}
          />
          <DatePickerCustome onChange={handleDatePickerChange} />
          <div />
        </div>

        <FullCalendar
          ref={fullcalendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          height={"100%"}
          initialView={selectedView}
          droppable
          selectable
          headerToolbar={false}
          dateClick={handleDateClick}
          events={events}
          eventBackgroundColor="blue"
          eventMinHeight={50}
          drop={function (info) {
            // remove the element from the "Draggable Events" list
            info.draggedEl.parentNode.removeChild(info.draggedEl);
          }}
        />

        {showPopup && (
          <Popup
            styles={{
              left: popupPosition.x,
              top: popupPosition.y,
            }}
            onClose={handleOnClose}
          />
        )}
      </div>
    </div>
  );
}
