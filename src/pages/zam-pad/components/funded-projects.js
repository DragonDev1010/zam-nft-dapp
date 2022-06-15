import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FILTERS_INFO, SALES_INFO } from "../info";

import { Button } from "./button";
import { BigCard } from './big-card';

export const FundedProjects = ({stage, allocationTotal, progress, allocationSold, endDate }) => {

    const [activeFilter, setActiveFilter] = useState("All");

    const handleFilter = (name) => {
        setActiveFilter(name)
    }

    const filterSales = ( sales, filter ) => {
        switch (filter) {
            case "BSC": 
                return sales.filter(item => item.bsc);
            case "SOL": 
                return sales.filter(item => item.sol);
            case "ETH": 
                return sales.filter(item => item.eth);
            case "MATIC": 
                return sales.filter(item => item.matic);
            default:
                return sales
        }
    }

    const filteredSales = filterSales( SALES_INFO, activeFilter )

    return (
        <div className="funded-projects">
            <div className="funded-projects__wrapper">
                <div className="funded-projects__title-block">
                    <h3 className="funded-projects__title">Funded Projects</h3>
                    <p className="funded-projects__description">We bring new technologies to our community</p>
                </div>
                <div className="funded-projects__filters">
                    {FILTERS_INFO.length && FILTERS_INFO.map((item) => 
                    <Button 
                        {...item} 
                        key={item.name} 
                        activeFilter={activeFilter} 
                        handleFilter={handleFilter}
                    />)}
                </div>
            </div>
            <div className="funded-projects__projects">
                <div className="zam-pad__cards">
                    {filteredSales && filteredSales.slice(0, 3).map((item) => 
                        <BigCard 
                            {...item} 
                            key={item.title} 
                            stage={stage}
                            allocationTotal={allocationTotal}
                            progress={progress}
                            allocationSold={allocationSold}
                            endDate={endDate}
                    />)}
                </div>
            </div>
            <div className="funded-projects__more-btn">
                <Link to="/calendar" className="more-pools">More Pools</Link>
            </div>
        </div>
    )
};