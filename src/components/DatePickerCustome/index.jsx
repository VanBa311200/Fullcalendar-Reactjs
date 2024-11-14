import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import { formatRange, formatDate } from "@fullcalendar/core";

import "./index.css";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerCustome = ({ onChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  );

  const handleOnChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange(dates);
  };

  return (
    <div className="container-datepicker">
      <DatePicker
        monthsShown={2}
        onChange={handleOnChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        customInput={<CustomInput className="custome-input-datepicker" />}
      />
    </div>
  );
};
export default DatePickerCustome;

const CustomInput = forwardRef(
  ({ value, onClick, className, ...props }, ref) => {
    const [start, end] = value.split("-");

    return (
      <button className={className} onClick={onClick} ref={ref}>
        {!end.trim()
          ? formatDate(new Date(start), {
              separator: "-",
              year: "numeric",
              month: "short",
              day: "numeric",
              omitCommas: false,
            })
          : formatRange(new Date(start), new Date(end), {
              separator: "-",
              year: "numeric",
              month: "short",
              day: "numeric",
              omitCommas: false,
            })}
      </button>
    );
  },
);
