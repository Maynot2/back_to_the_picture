import React, { useState } from "react";
import DatePicker from "react-datepicker";

function DatePick({ datePicked, label, isSearchPic }) {
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
          id={label}
          className={`text-neutralB bg-neutralW font-semibold py-2 px-4 border ${
            isSearchPic ? "border-tertiary" : "border-secondary"
          } rounded shadow`}
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            datePicked.current[label] = date;
          }}
        />
      </div>
    </div>
  );
}

export default DatePick;
