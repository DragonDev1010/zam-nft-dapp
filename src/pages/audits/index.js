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
                    largeIcon="../../../images/js-code.png"
                    title="CertiK Security Leaderboard"
                    date="23 Sep, 2021"
                    githubLink="https://github.com/Zamio-Finan..."
                    subject="Zamio Factory Security Assessment, CertiK"
                    titleIcon="../../../images/certik.svg"
                    firstButtonContent="DetailedError" />

                <BodyCard
                    largeIcon="../../../images/audits-router-card.png"
                    title="CertiK Security Leaderboard"
                    date="21 Aug, 2021"
                    githubLink="https://github.com/Zamio-Finan..."
                    subject="Zamio Factory Security Assessment, CertiK"
                    titleIcon="../../../images/certik.svg"
                    firstButtonContent="DetailedError" />

                <BodyCard
                    largeIcon="../../../images/audits-farm-card.png"
                    title="CertiK Security Leaderboard"
                    date="07 Jul, 2021"
                    githubLink="https://github.com/Zamio-Finan..."
                    subject="Security Assessment Zamio Farm, CertiK"
                    titleIcon="../../../images/certik.svg"
                    firstButtonContent="DetailedError" />

                <BodyCard
                    largeIcon="../../../images/audits-certificate-card.png"
                    title="Chainsulting"
                    date="27 Jun, 2021"
                    height="300px"
                    bscscan="https://www.bscscan.com/addres..."
                    githubLink="https://github.com/Zamio-Finan..."
                    subject="Core Contracts Zamio Audit"
                    titleIcon="../../../images/certik.svg"
                    firstButtonContent="DetailedError"
                    secondButtonContent="GitHub Sertificate PDF" />
            </div>
        </article >
    )
};
