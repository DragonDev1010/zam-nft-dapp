import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const CalendarRow = ({ title, icon, type, tokenName, stage, goal, endsIn, href }) => {

  const [leftTime, setLeftTime] = useState('');

  const endDate = new Date(endsIn);

  useEffect(() => {
    setLeftTime(endDate.getTime() - Date.now());
  }, [])

  const monthsLeft = Math.floor(leftTime / (1000 * 60 * 60 * 24 * 30));
  const weeksLeft = Math.floor(leftTime / (1000 * 60 * 60 * 24 * 7));
  const daysLeft = Math.floor(leftTime / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(leftTime / (1000 * 60 * 60));

  const leftText = (leftTime) => {
    if (leftTime < 0) {
      return "Ended"
    } else {
      if (monthsLeft >= 2) {
        return `${monthsLeft} months left`
      } else if (monthsLeft > 0 && monthsLeft < 2) {
        return `${monthsLeft} month left`
      }
      if (weeksLeft >= 2) {
        return `${weeksLeft} weeks left`
      } else if (weeksLeft > 0 && weeksLeft < 2) {
        return `${weeksLeft} week left`
      }
      if (daysLeft >= 2) {
        return `${daysLeft} days left`
      } else if (daysLeft > 0 && daysLeft < 2) {
        return `${daysLeft} day left`
      }
      if (hoursLeft >= 2) {
        return `${hoursLeft} hours left`
      } else if (hoursLeft > 0 && hoursLeft < 2) {
        return `${hoursLeft} hour left`
      }
    }
  }

  const filterColor = ( type ) => {
    switch (type) {
      case "IDO": 
        return "orange";
      case "IEO": 
        return "violet";
      case "INO": 
        return "blue";
      case "IGO": 
        return "yellow";
      case "ICO": 
        return "red";
      case "IFO": 
        return "pink";
      default:
        return "green"
    }
  }

  const color = filterColor(type);

  return (
    <Link to={href} className="calendar-table__row">
      <div className="calendar-table__cell calendar-table__cell_name">
        <div className="calendar-table__name">
          <div className="calendar-table__img-wrapper">
            <img src={icon} alt={title} className="calendar-table__img" />
          </div>
          <div className="calendar-table__name-content">
            <div className="calendar-table__title">
              {title} <span className="calendar-table__token">{tokenName}</span>
            </div>
            <div className={`calendar-table__type calendar-table__type_${color}`}>{type}</div>
          </div>
        </div>
      </div>
      <div className="calendar-table__cell">{stage}</div>
      <div className="calendar-table__cell">
        <div className="calendar-table__left-time">{leftText(leftTime)}</div>
        <div className="calendar-table__ends-in">{endsIn}</div>
      </div>
      <div className="calendar-table__cell">${goal}</div>
    </Link>
  );
};