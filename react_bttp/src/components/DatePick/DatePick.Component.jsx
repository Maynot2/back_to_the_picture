import React, { useState } from "react";
import DatePicker from "react-datepicker";

function DatePick({ dateList, label }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="flex">
      <div className={label}>
        <button className=" bg-secondary text-neutralB w-20 font-semibold py-2 px-4 border border-tertiary rounded shadow">
          {label.replace(/^\w/, (c) => c.toUpperCase())}
        </button>
      </div>
      <div className="from ml-4 w-full">
        <DatePicker
          className="text-neutralB bg-neutralW font-semibold py-2 px-4 border border-tertiary rounded shadow"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            // check if array of dateList is full (two dates has already been saved)
            if (dateList.current.length >= 2) {
              dateList.current.length = [];
            }
            dateList.current.push(date);
          }}
        />
      </div>
    </div>
  );
}

export default DatePick;
