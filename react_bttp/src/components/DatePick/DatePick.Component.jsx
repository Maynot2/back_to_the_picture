import React, { useState } from "react";
import DatePicker from "react-datepicker";

function DatePick({ dateList, label, isSearchPic }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="flex">
      <div className={label}>
        <div
          className={`${
            isSearchPic
              ? "bg-tertiary border-tertiary"
              : "bg-secondary border-secondary"
          } text-neutralW text-center w-20 font-semibold py-2 px-4 rounded`}
        >
          {label.replace(/^\w/, (c) => c.toUpperCase())}
        </div>
      </div>
      <div className="ml-4 w-full">
        <DatePicker
          className={`text-neutralB bg-neutralW font-semibold py-2 px-4 border ${
            isSearchPic ? "border-tertiary" : "border-secondary"
          } rounded shadow`}
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
