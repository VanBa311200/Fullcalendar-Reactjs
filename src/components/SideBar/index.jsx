import { forwardRef } from "react";
import "./index.css";

const SideBar = ({ externalEvents }, ref) => {
  return (
    <div className="sidebar-container">
      <div id="external-events" ref={ref}>
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
  );
};
export default forwardRef(SideBar);
