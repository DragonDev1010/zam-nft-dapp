import React from 'react'

import { SOCIALS_INFO } from "../info";

import { Socials } from '@src/components/socials/social';
import { SocialLink } from '@src/components/socials/social-link';

export const Head = ({headerImage, title, subtitle, description}) => {
  return (
    <div className="highstreet-body__head">
      <div className="highstreet-body__head-top">
        <div className="highstreet-body__head-title-container">
          <div className="highstreet-body__head-img-wrapper">
            <img className="highstreet-body__head-img" src={headerImage} />
          </div>
          <div className="highstreet-body__head-title-content">
            <div className="highstreet-body__head-title">{title}</div>
            <div className="highstreet-body__head-subtitle">{subtitle}</div>
          </div>
        </div>
          <div className="highstreet-body__head-icons">
            <Socials>
              {SOCIALS_INFO.length && SOCIALS_INFO.map(({ href, imgUrl }, index) => (
                    <SocialLink key={Math.random(index)} href={href} imgUrl={imgUrl} />
                ))}
            </Socials>
          </div>
      </div>
    <div className="highstreet-body__head-desc">{description}</div>
  </div>
  )
};

