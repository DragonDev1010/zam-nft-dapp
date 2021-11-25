import React from 'react';
import { Header } from './header';
import { BodyCard } from './body-card';

export const AuditsPage = () => {
    return (
        <article>
            <div className="general-container">
                <Header />
            </div>
            <div className="cards">
                <BodyCard
                    largeIcon="/images/js-code.png"
                    title="CertiK Security Leaderboard"
                    date="2021/09/28"
                    githubLink="https://github.com/Zamio-Finan..."
                    githubLinkHref="https://github.com/Zamzam-Technology/zam_token"
                    subject="Zamzam (ZAM) Token ERC20 Audit"
                    titleIcon="/images/certik.svg"
                    firstButtonContent="Detailed Report" />

            </div>
        </article >
    )
};
