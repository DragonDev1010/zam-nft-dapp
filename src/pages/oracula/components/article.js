import React from "react";

export const Article = ({ title, description, imgUrl = "" }) => {

  return (
    <div className="highstreet-body__information-article" id={title}>
      <div className="highstreet-body__information-article-title">{title}</div>
      {imgUrl && <img src={imgUrl} />}
      <div className="highstreet-body__information-article-description" dangerouslySetInnerHTML={{__html: description}}></div>
    </div>
  );
};
