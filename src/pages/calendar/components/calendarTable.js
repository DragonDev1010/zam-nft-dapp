import React from "react";

export const CalendarTable = ({ children }) => {
  return (
    <div className="calendar-table">
      <div className="calendar-table__head">
        <div className="calendar-table__row">
          <div className="calendar-table__cell calendar-table__cell_name">
            Name
          </div>
          <div className="calendar-table__cell">Stage</div>
          <div className="calendar-table__cell">Ends In</div>
          <div className="calendar-table__cell">Goal</div>
        </div>
      </div>
      <div className="calendar-table__body">{children}</div>
    </div>
  );
};
