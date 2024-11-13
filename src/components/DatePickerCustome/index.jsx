import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

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
        dateFormat={"dd/MM/yyyy"}
        customInput={<CustomInput />}
      />
    </div>
  );
};
export default DatePickerCustome;

const CustomInput = forwardRef(({ value, onClick, className }, ref) => (
  <button className={className} onClick={onClick} ref={ref}>
    {value}
  </button>
));
