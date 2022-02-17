import React from "react";

export const Article = ({ title, description, imgUrl = "", customRef }) => {
  return (
    <div className="highstreet-body__information__articles__article" ref={customRef}>
      <div className="highstreet-body__information__articles__article__title">{title}</div>
      {imgUrl && <img src={imgUrl} />}
      <div className="highstreet-body__information__articles__article__description">{description}</div>
    </div>
  );
};
