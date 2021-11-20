import React from 'react';
import { Header } from './header';
import { BodyCard } from './body-card';

export const AuditsPage = () => {
    return (
        <article>
            <div className="general-container">
                <Header />
            </div>
            <div className="audits-body-container">
                <BodyCard
                    largeIcon="/images/js-code.png"
                    title="CertiK Security Leaderboard"
                    date="23 Sep, 2021"
                    githubLink="https://github.com/Zamio-Finan..."
                    githubLinkHref="https://github.com/Zamzam-Technology/zam_token"
                    subject="Zamio Factory Security Assessment, CertiK"
                    titleIcon="/images/certik.svg"
                    firstButtonContent="Detailed Report" />

            </div>
        </article >
    )
};
