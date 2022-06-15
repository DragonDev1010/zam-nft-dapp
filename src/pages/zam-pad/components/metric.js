import React from 'react';


export const Metric = ({modifier, count, text}) => {

    return (
      <div className="zam-pad__header-metrics-item">
        <div className="zam-pad__header-metrics-content">
          <div className={"zam-pad__header-metrics-count" + " " + modifier}>
              {count}
          </div>
          <div className="zam-pad__header-metrics-description">
              {text}
          </div>
        </div>
      </div>
    )
};