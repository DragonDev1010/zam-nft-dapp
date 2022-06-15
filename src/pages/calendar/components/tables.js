import React from "react";

import { CalendarTable } from "./calendarTable";
import { CalendarRow } from "./calendarRow";

export const Tables = ({ activeFilter, visibleProjects, setActiveFilter }) => {
  const filterStatus = (items, status) => {
    return items.filter((item) => {
      return item.status === status;
    });
  };

  const ongoingProjects = filterStatus(visibleProjects, "Ongoing");
  const upcomingProjects = filterStatus(visibleProjects, "Upcoming");
  const endedProjects = filterStatus(visibleProjects, "Ended");

  switch (activeFilter) {
    case "Overview":
      return (
        <div className="calendar__tables">
          <div className="calendar__table">
            <div className="calendar__table-title">Ongoing Projects</div>
            <div className="calendar__table-content">
              <CalendarTable>
                {ongoingProjects.length > 0 &&
                  ongoingProjects
                    .slice(0, 10)
                    .map((item) => <CalendarRow {...item} key={item.id} />)
                  }
              </CalendarTable>
            </div>
            {ongoingProjects.length > 9 && (
              <div className="calendar__button-wrapper">
                <button
                  className="calendar__button"
                  onClick={() => setActiveFilter("Ongoing")}
                >
                  View all Projects
                </button>
              </div>
            )}
          </div>
          <div className="calendar__table">
            <div className="calendar__table-title">Upcoming Projects</div>
            <div className="calendar__table-content">
              <CalendarTable>
                {upcomingProjects.length > 0 &&
                  upcomingProjects
                    .slice(0, 10)
                    .map((item) => <CalendarRow {...item} key={item.id} />)
                }
              </CalendarTable>
            </div>
            {upcomingProjects.length > 9 && (
              <div className="calendar__button-wrapper">
                <button
                  className="calendar__button"
                  onClick={() => setActiveFilter("Upcoming")}
                >
                  View all Projects
                </button>
              </div>
            )}
          </div>
        </div>
      );
    case "Ongoing":
      return (
        <div className="calendar__table">
          <div className="calendar__table-title">Ongoing Projects</div>
          <div className="calendar__table-content">
            <CalendarTable>
              {ongoingProjects.length > 0 &&
                ongoingProjects.map((item) => (
                  <CalendarRow {...item} key={item.id} />
                ))
              }
            </CalendarTable>
          </div>
        </div>
      );
    case "Upcoming":
      return (
        <div className="calendar__table">
          <div className="calendar__table-title">Upcoming Projects</div>
          <div className="calendar__table-content">
            <CalendarTable>
              {upcomingProjects.length > 0 &&
                upcomingProjects.map((item) => (
                  <CalendarRow {...item} key={item.id} />
                ))
              }
            </CalendarTable>
          </div>
        </div>
      );
    case "Ended":
      return (
        <div className="calendar__table">
          <div className="calendar__table-title">Ended Projects</div>
          <div className="calendar__table-content">
            <CalendarTable>
              {endedProjects.length > 0 &&
                endedProjects.map((item) => (
                  <CalendarRow {...item} key={item.id} />
                ))
              }
            </CalendarTable>
          </div>
        </div>
      );
  }
};
