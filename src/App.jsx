import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import Dropdown from "react-dropdown";

import Popup from "./components/Popup";
import DatePickerCustome from "./components/DatePickerCustome";
import { getRandomColor, getDiffOf2Days } from "./utils";

import "./App.css";
import "react-dropdown/style.css";
// import "@fullcalendar/common/main.css"; // Import common styles

const events = [
  {
    start: "2024-11-13T11:30:00+07:00",
    end: "2024-11-13T13:30:00+07:00",
    title: "Meeting",
    backgroundColor: "blue",
    color: "blue",
    borderColor: "blue",
  },
  {
    start: "2024-11-13T06:30:00+07:00",
    end: "2024-11-13T07:30:00+07:00",
    title: "Swiming",
    backgroundColor: "blue",
    borderColor: "blue",
  },
  {
    start: "2024-11-14T08:00:00+07:00",
    end: "2024-11-14T11:30:00+07:00",
    title: "Meeting",
    backgroundColor: "red",
    borderColor: "red",
  },
];

// View options
const viewOptions = [
  { value: "dayGridMonth", label: "Month View" },
  { value: "dayGridWeek", label: "Week View" },
  { value: "resourceTimeGridDay", label: "Day View" },
];

export default function Calendar() {
  const fullcalendarRef = useRef();
  const draggableEl = useRef();

  // State to manage selected view
  const [stateCalendar, setStateCalendar] = useState({
    calendarEvents: [...events],
    selectedView: "dayGridMonth",
  });

  const [externalEvents, setExternalEvents] = useState([
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      color: getRandomColor(),
    },
    {
      id: 2,
      title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      color: getRandomColor(),
    },
    {
      id: 3,
      title:
        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system",
      color: getRandomColor(),
    },
    {
      id: 4,
      title:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident",
      color: getRandomColor(),
    },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  // Handle view change
  const handleViewChange = ({ value }) => {
    const calendarApi = fullcalendarRef.current.getApi();
    calendarApi.changeView(value);
    setStateCalendar((prev) => ({ ...prev, selectedView: value }));
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
    const diff = getDiffOf2Days(start, end) + 1;

    const calendarApi = fullcalendarRef.current.getApi();

    if (start && end) {
      calendarApi.changeView("timeGrid", { start, end: endDay });
      setStateCalendar((prev) => ({ ...prev, selectedView: "timeGrid" }));
    }
  };

  // handle event receive
  const handleEventReceive = (eventInfo) => {
    console.log("eventInfo", eventInfo);
    const { title, backgroundColor, id, startStr, allDay } = eventInfo.event;
    const newEvent = {
      id,
      title,
      allDay,
      start: new Date(startStr),
      color: backgroundColor,
    };

    console.log("newEvent", newEvent);

    setStateCalendar((state) => {
      return {
        ...state,
        calendarEvents: [...stateCalendar.calendarEvents, newEvent],
      };
    });
  };

  console.log("calendarEvents", stateCalendar.calendarEvents);

  useEffect(() => {
    new Draggable(draggableEl.current, {
      itemSelector: ".fc-event",
      eventData: (eventEl) => {
        const id = eventEl.getAttribute("data-id");
        const title = eventEl.getAttribute("data-title");
        const color = eventEl.getAttribute("data-color");

        return {
          id,
          title,
          color,
        };
      },
    });
  }, []);

  return (
    <div className="container">
      {/* Dropdown for view selection */}
      <div className="sidebar-container" ref={draggableEl}>
        <div id="external-events">
          <p>
            <strong>Draggable Events</strong>
          </p>

          {externalEvents.map((item, key) => (
            <div
              className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event"
              key={key}
              style={{ backgroundColor: item.color }}
              data-color={item.color}
              data-id={item.id}
              data-title={item.title}
            >
              <div className="fc-event-main">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: "100vh", width: "100vw" }}>
        <div className="header-toolbar">
          <Dropdown
            className="dropdown-toolbar"
            options={viewOptions}
            onChange={handleViewChange}
            value={stateCalendar.selectedView}
          />
          <DatePickerCustome onChange={handleDatePickerChange} />
          <div />
        </div>

        <FullCalendar
          ref={fullcalendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            resourceTimeGridPlugin,
          ]}
          height={"100%"}
          initialView={stateCalendar.selectedView}
          editable
          droppable={false}
          selectable
          headerToolbar={false}
          dateClick={handleDateClick}
          events={stateCalendar.calendarEvents}
          drop={function (info) {
            // remove the element from the "Draggable Events" list
            const id = info.draggedEl.getAttribute("data-id");

            setExternalEvents((state) => {
              const ls = state.filter((item) => item.id != id);
              return ls;
            });
          }}
          resources={[
            { id: "a", title: "Auditorium A" },
            { id: "b", title: "Auditorium B" },
            { id: "c", title: "Auditorium C" },
          ]}
          eventReceive={handleEventReceive}
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
